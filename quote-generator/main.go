package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

type Quote struct {
	Quote  string `json:"q"`
	Author string `json:"a"`
}

func main() {
	resp, err := http.Get("https://zenquotes.io/api/random")
	if err != nil {
		fmt.Println("Failed to fetch quote:", err)
		return
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("Failed to read response body:", err)
		return
	}

	var quotes []Quote
	err = json.Unmarshal(body, &quotes)
	if err != nil {
		fmt.Println("Failed to parse response body:", err)
		return
	}

	for _, quote := range quotes {
		fmt.Println(quote.Quote)
		fmt.Println("  - ", quote.Author)
	}
}
