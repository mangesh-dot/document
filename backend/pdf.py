from flask import  request, send_file
from io import BytesIO
from reportlab.pdfgen import canvas



def generate_pdf():
    data = request.json
    entries = data.get('entries', [])

    buffer = BytesIO()
    p = canvas.Canvas(buffer)
    p.setFont("Helvetica", 14)

    y = 800
    for entry in entries:
        title = entry.get('title', 'No Title')
        content = entry.get('content', 'No Content')
        p.drawString(100, y, title)
        y -= 20
        for line in content.split('\n'):
            p.drawString(120, y, line)
            y -= 15
        y -= 20  

    p.showPage()
    p.save()
    buffer.seek(0)

    return send_file(buffer, as_attachment=True, download_name='document.pdf', mimetype='application/pdf')