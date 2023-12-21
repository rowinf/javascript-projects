package main

import (
	"io"
	"net/http"
	"text/template"

	"github.com/labstack/echo/v4"
)

type Template struct {
	templates *template.Template
}

func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.templates.ExecuteTemplate(w, name, data)
}

func fileHandler(filename string) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, filename)
	}
}

type ImageType struct {
	Url string
}

type PageData struct {
	Title  string
	Images []ImageType
}

func indexHandler(c echo.Context) error {
	images := []ImageType{
		{"https://images.unsplash.com/photo-1702998033114-c01f9b2dea5b?q=80&w=365&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
		{"https://images.unsplash.com/photo-1702998033114-c01f9b2dea5b?q=80&w=365&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
		{"https://images.unsplash.com/photo-1702998033114-c01f9b2dea5b?q=80&w=365&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
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
