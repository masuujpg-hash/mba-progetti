import fitz
import winsdk.windows.graphics.imaging as imaging
import winsdk.windows.media.ocr as ocr
from winsdk.windows.storage import StorageFile, FileAccessMode
import asyncio
import os
import json

async def ocr_page(pdf_path, page_num, engine):
    doc = fitz.open(pdf_path)
    page = doc[page_num]
    zoom = 2.5
    mat = fitz.Matrix(zoom, zoom)
    pix = page.get_pixmap(matrix=mat)
    temp_img_path = f"temp_ocr_{page_num}.png"
    pix.save(temp_img_path)
    doc.close()
    
    try:
        abs_path = os.path.abspath(temp_img_path)
        file = await StorageFile.get_file_from_path_async(abs_path)
        stream = await file.open_async(FileAccessMode.READ)
        decoder = await imaging.BitmapDecoder.create_async(stream)
        software_bitmap = await decoder.get_software_bitmap_async()
        
        result = await engine.recognize_async(software_bitmap)
        
        lines = [line.text for line in result.lines]
        return {"page_num": page_num + 1, "lines": lines, "text": "\n".join(lines)}
    except Exception as e:
        print(f"Error page {page_num+1}: {e}")
        return {"page_num": page_num + 1, "lines": [], "text": ""}
    finally:
        if os.path.exists(temp_img_path):
            os.remove(temp_img_path)

async def main():
    pdf_path = r"C:\Users\Andrea Masucci\Desktop\mba studio\sito nuovo\Nuova cartella\PORTFOLIO_RILIEVI.pdf"
    engine = ocr.OcrEngine.try_create_from_user_profile_languages()
    doc = fitz.open(pdf_path)
    num_pages = len(doc)
    doc.close()
    
    results = []
    for i in range(num_pages):
        res = await ocr_page(pdf_path, i, engine)
        lines_cnt = len(res["lines"])
        print(f"Page {i+1}: {lines_cnt} lines recognized")
        results.append(res)
        
    out_dir = r"C:\Users\Andrea Masucci\Desktop\mba studio\sito nuovo\Nuova cartella\PORTFOLIO_RILIEVI_WEB"
    os.makedirs(out_dir, exist_ok=True)
    out_json = os.path.join(out_dir, "ocr_rilievi.json")
    with open(out_json, "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    print(f"OCR complete and saved to {out_json}")

if __name__ == "__main__":
    asyncio.run(main())
