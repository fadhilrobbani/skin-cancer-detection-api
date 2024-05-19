FROM node:22
WORKDIR /app
ENV PORT 3000
ENV MODEL_URL="https://storage.googleapis.com/model-production-submissionmlgc-fadhillailham/model-in-prod/model.json"
COPY . .
RUN npm install
EXPOSE 3000
CMD [ "npm", "run", "start"]