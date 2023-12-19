package main

import (
	"encoding/json"
	"fmt"
	"io"
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
			<title>Data Page</title>
		</head>
		<body>
			<blockquote>{{.Quote}}<span>{{.Author}}</span></blockquote>
		</body>
		</html>
	`

	// Parse the HTML template
	tmpl, err := template.New("html").Parse(htmlTemplate)
	if err != nil {
		http.Error(w, "Failed to parse HTML template", http.StatusInternalServerError)
		return
	}

	// Set the response header
	w.Header().Set("Content-Type", "text/html")

	// Execute the template with the data and write the HTML response
	err = tmpl.Execute(w, data)
	if err != nil {
		http.Error(w, "Failed to execute HTML template", http.StatusInternalServerError)
		return
	}
}

func main() {
	http.HandleFunc("/api/data", func(w http.ResponseWriter, r *http.Request) {
		data := fetchRandomQuote()

		// Check the "Accept" header to determine the response format
		acceptHeader := r.Header.Get("Accept")
		if strings.Contains(acceptHeader, "text/html") {
			// Respond with HTML
			renderHTML(w, data)
		} else {
			// Respond with JSON
			renderJSON(w, data)
		}
	})

	// Start the HTTP server on port 8080
	fmt.Println("Server is running on :8080")
	http.ListenAndServe(":8080", nil)
}
