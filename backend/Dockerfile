# Image
FROM Python:3.11

# Update the apt-get
RUN apt-get update && \
    apt-get upgrade -y \

# Working Directory
WORKDIR /app

# Copy Files requirements.txt
COPY requirements.txt .

# Update PIP and Install the requirements
RUN pip install --upgrade pip && \
    pip install -r requirements.txt \

# Copy the rest of the files \
COPY . /app