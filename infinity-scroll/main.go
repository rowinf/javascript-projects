package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"strconv"
	"text/template"

	"github.com/labstack/echo/v4"
)

type Template struct {
	templates *template.Template
}

func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.templates.ExecuteTemplate(w, name, data)
}

type PageData struct {
	ImagePage int
	Images    []Image
}

type Image struct {
	Urls struct {
		Small string `json:"small"`
	} `json:"urls,omitempty"`
	Caption string `json:"alt_description,omitempty"`
	Links   struct {
		Html string `json:"html"`
	} `json:"links,omitempty"`
	Width       int `json:"width"`
	Height      int `json:"height"`
	SmallHeight int
	SmallWidth  int
}

func NewPageData(page string) PageData {
	i, err := strconv.Atoi(page)
	if err != nil {
		i = 1
	}
	return PageData{i, make([]Image, 10)}
}

func fetchImages(pageData PageData) error {
	unsplashAPI := "https://api.unsplash.com/photos"
	accessKey := os.Getenv("UNSPLASH_API_KEY")
	if accessKey == "" {
		panic("uninitialised env accessKey")
	}
	response, err := http.Get(unsplashAPI + "?client_id=" + accessKey + "&page=" + fmt.Sprintf("%d", pageData.ImagePage))
	if err != nil {
		return err
	}
	defer response.Body.Close()

	err = json.NewDecoder(response.Body).Decode(&pageData.Images)
	if err != nil {
		return err
	}
	for i := 0; i < len(pageData.Images); i++ {
		image := pageData.Images[i]
		image.SmallWidth = 400
		image.SmallHeight = image.SmallWidth * image.Height / image.Width
		pageData.Images[i] = image
	}

	return nil
}

func indexHandler(c echo.Context) error {
	pageData := NewPageData(c.QueryParam("page"))
	uerr := fetchImages(pageData)
	if uerr != nil {
		c.Logger().Warn("couldn't fetch images", uerr)
	}

	if err := c.Render(http.StatusOK, "index.html", pageData); err != nil {
		c.Logger().Fatal(err)
		return err
	}
	return nil
}

func imageListHandler(c echo.Context) error {
	pageData := NewPageData(c.QueryParam("page"))
	uerr := fetchImages(pageData)
	if uerr != nil {
		c.Logger().Warn("couldn't fetch images", uerr)
	}

	if err := c.Render(http.StatusOK, "image-list.html", pageData); err != nil {
		c.Logger().Fatal(err)
		return err
	}
	return nil
}

var fns = template.FuncMap{
	"plus1": func(x int) int {
		return x + 1
	},
}

func main() {
	e := echo.New()
	e.File("/style.css", "style.css")
	e.File("/script.js", "script.js")
	t := &Template{
		templates: template.Must(template.New("index.html").Funcs(fns).ParseFiles("index.html", "image-list.html")),
	}
	e.Renderer = t

	e.GET("/", indexHandler)
	e.GET("/image-list", imageListHandler)

	e.Logger.Info("Server is running on http://localhost:3000")
	if err := e.Start(":3000"); err != nil {
		e.Logger.Fatal("Could not start server ", err)
	}
}
