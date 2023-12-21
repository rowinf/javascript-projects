package main

import (
	"fmt"
	"log"
	"net/http"
	"text/template"
)

// Function to render HTML response
func renderPhotos(w http.ResponseWriter, data any) {
	tmpl, err := template.ParseFiles("index.html")
	if err != nil {
		log.Fatal(err)
		http.Error(w, "Failed to parse HTML template", http.StatusInternalServerError)
		return
	}

	// Set the response header
	w.Header().Set("Content-Type", "text/html")

	// Execute the template with the data and write the HTML response
	err = tmpl.Execute(w, data)
	if err != nil {
		log.Fatal(err)
		http.Error(w, "Failed to execute HTML template", http.StatusInternalServerError)
		return
	}
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

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		images := []ImageType{
			{"https://images.unsplash.com/photo-1702998033114-c01f9b2dea5b?q=80&w=365&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
			{"https://images.unsplash.com/photo-1702998033114-c01f9b2dea5b?q=80&w=365&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
		}
		Index("Page Title", images).Render(r.Context(), w)
	})

	http.HandleFunc("/style.css", fileHandler("style.css"))
	fmt.Println("Server is running on :3000")
	err := http.ListenAndServe(":3000", nil)
	if err != nil {
		log.Fatal("Could not start server ", err)
	}
}
