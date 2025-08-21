FROM python:3.13-slim

# Avoid writing .pyc files and ensure stdout/stderr are unbuffered
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# Install Python dependencies first for better layer caching
COPY requirements.txt ./
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

# Copy the scraper script
COPY gunpost.py ./

# Run the scraper (loops indefinitely per script logic)
CMD ["python", "-u", "gunpost.py"]


