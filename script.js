// public/script.js

document.getElementById('chatForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const file = document.getElementById('pdf').files[0];
  const question = document.getElementById('question').value;

  if (!file || !question) return;

  const formData = new FormData();
  formData.append('pdf', file);
  formData.append('question', question);

  const response = await fetch('/api/ask', {
    method: 'POST',
    body: formData
  });

  const data = await response.json();
  document.getElementById('answer').textContent = data.answer;
});
