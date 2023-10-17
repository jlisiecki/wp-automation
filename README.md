# Automatyzacja WP

Automatyzacja pozwala na ustawianie wartości dowolnych pól w panelu Wordpressa dla wskazanego adresu URL.

1. Zainstalować zależności wpisując komendę `npm i` będąc w głównym katalogu projektu
2. Należy utworzyć plik .env zawierający dane logowania do WordPressa na podstawie przykładowego pliku .env.example
3. W pliku .env w polu `DATA_FILE` należy umieścić nazwę pliku csv umieszczonego w głównym katalogu projektu, posiadajacego kolumne "url" oraz kolumny odpowiadające selektorom pól w panelu WP (przykładowy plik csv: `example.csv`).
4. Uruchomić rozwiązanie z użyciem komendy `npm run dev` będąc w głównym katalogu projektu
