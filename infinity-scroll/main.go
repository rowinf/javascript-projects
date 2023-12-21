package main

import (
	"encoding/json"
	"io"
	"net/http"
	"os"
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
	Title  string
	Images []Image
}

// Image represents image data from Unsplash
type Image struct {
	Urls struct {
		Small string `json:"small"`
	} `json:"urls,omitempty"`
	Caption string `json:"alt_description,omitempty"`
}

func fetchImages() ([]Image, error) {
	unsplashAPI := "https://api.unsplash.com/photos"
	accessKey := os.Getenv("UNSPLASH_API_KEY")
	response, err := http.Get(unsplashAPI + "?client_id=" + accessKey)
	if err != nil {
		return nil, err
	}
	defer response.Body.Close()

	var images []Image
	err = json.NewDecoder(response.Body).Decode(&images)
	if err != nil {
		return nil, err
	}

	return images, nil
}

func indexHandler(c echo.Context) error {
	images, uerr := fetchImages()
	if uerr != nil {
		c.Logger().Warn("couldn't fetch images", uerr)
	}

	pageData := PageData{"Page Title", images}

	if err := c.Render(http.StatusOK, "index.html", pageData); err != nil {
		c.Logger().Fatal(err)
		return err
	}
	return nil
}

func main() {
	e := echo.New()
	e.File("/style.css", "style.css")
	e.File("/script.js", "script.js")
	t := &Template{
		templates: template.Must(template.ParseFiles("index.html")),
	}
	e.Renderer = t

	e.GET("/", indexHandler)

	e.Logger.Info("Server is running on http://localhost:3000")
	if err := e.Start(":3000"); err != nil {
		e.Logger.Fatal("Could not start server ", err)
	}
}
