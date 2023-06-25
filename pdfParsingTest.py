from tika import parser  # pip install tika
from PyPDF2 import PdfReader

# raw = parser.from_file('resume.pdf')
pdf = PdfReader('resume example.pdf')

text = ''
for page_num in range(len(pdf.pages)):
    page = pdf.pages[page_num]
    text += page.extract_text()

# Clean up the text as needed
text = str(text)
print(text)