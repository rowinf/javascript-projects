package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"strings"
	"text/template"
)

type Quote struct {
	Quote  string `json:"q"`
	Author string `json:"a"`
}

func fetchRandomQuote() []Quote {
	var quotes []Quote
	resp, err := http.Get("https://zenquotes.io/api/random")
	if err != nil {
		fmt.Println("Failed to fetch quote:", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("Failed to read response body:", err)
	}
	err = json.Unmarshal(body, &quotes)
	if err != nil {
		fmt.Println("Failed to parse response body:", err)
	}

	return quotes
}

// Function to render JSON response
func renderJSON(w http.ResponseWriter, data any) {
	// Convert the data to JSON
	jsonData, err := json.Marshal(data)
	if err != nil {
		http.Error(w, "Failed to marshal data to JSON", http.StatusInternalServerError)
		return
	}

	// Set the response headers
	w.Header().Set("Content-Type", "application/json")

	// Write the JSON response
	w.Write(jsonData)
}

// Function to render HTML response
func renderHTML(w http.ResponseWriter, data any) {
	// Create an HTML template
	htmlTemplate := `
		<!DOCTYPE html>
		<html>
		<head>
			<title>Quote Generator | Random</title>
		</head>
		<body>
			<article>
        <section id="quote">
          <blockquote>
            <p>
              <i class="fas fa-quote-left"></i>
              {{.Quote}}
            </p>
          </blockquote>
          <p>&mdash;{{.Author}}</p>
        </section>
      </article>
		</body>
		</html>
	`

	// Parse the HTML template
	tmpl, err := template.New("html").Parse(htmlTemplate)
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

func rootHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "index.html")
}

func fileHandler(filename string) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, filename)
	}
}

func main() {
	http.HandleFunc("/", rootHandler)
	http.HandleFunc("/style.css", fileHandler("style.css"))
	http.HandleFunc("/script.js", fileHandler("script.js"))
	http.HandleFunc("/api/data", func(w http.ResponseWriter, r *http.Request) {
		data := fetchRandomQuote()

		acceptHeader := r.Header.Get("Accept")
		if strings.Contains(acceptHeader, "text/html") {
			renderHTML(w, data[0])
		} else {
			renderJSON(w, data[0])
		}
	})

	fmt.Println("Server is running on :3000")
	err := http.ListenAndServe(":3000", nil)
	if err != nil {
		log.Fatal("Could not start server ", err)
	}
}
