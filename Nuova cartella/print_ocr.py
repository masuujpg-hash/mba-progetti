import json

json_path = r"C:\Users\Andrea Masucci\Desktop\mba studio\sito nuovo\Nuova cartella\PORTFOLIO_RILIEVI_WEB\ocr_rilievi.json"
with open(json_path, encoding="utf-8") as f:
    data = json.load(f)

for page in data:
    if page["lines"]:
        print(f"=== PAGINA {page['page_num']} ===")
        print(page["text"])
        print("-" * 40)
