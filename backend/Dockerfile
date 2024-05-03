# Image
FROM python:3.11

# Working Directory
WORKDIR /backend

# Copy Files requirements.txt
ADD requirements.txt /backend/requirements.txt

# Update PIP and Install the requirements
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy the rest of the files \
COPY . /backend