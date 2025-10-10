from flask import  request, send_file
from io import BytesIO
from reportlab.pdfgen import canvas



def generate_pdf():
    # Get data from request
    data = request.json
    entries = data.get('entries', [])
    
   
    buffer = BytesIO()
    p = canvas.Canvas(buffer)
    
   
    y = 700
    
  
    p.setFont("Helvetica-Bold", 16)
    p.drawString(100, y, "Documentation")
    y -= 40
    
    
    for entry in entries:
       
        p.setFont("Helvetica-Bold", 14)
        p.drawString(50, y, "Title:")
        p.drawString(120, y, entry.get('title', 'No Title'))
        y -= 30
        
        
        p.setFont("Helvetica", 12)
        p.drawString(50, y, "Content:")
        y -= 20
        
        content = entry.get('content', 'No content')
        for line in content.split('\n'):
            p.drawString(70, y, line)
            y -= 15
        
        
        y -= 20
    
    # Save and return
    p.save()
    buffer.seek(0)

    return send_file(buffer, as_attachment=True, download_name='document.pdf', mimetype='application/pdf')