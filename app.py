from flask import Flask, render_template, request, jsonify
import os
import openai

app = Flask(__name__)

# Fetch the OpenAI API key from the environment variable
openai.api_key = os.getenv()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_bot_response', methods=['POST'])
def get_bot_response():
    user_message = request.form['user_message']

    # Call the OpenAI API to get bot response
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=user_message,
        max_tokens=50
    )

    bot_response = response.choices[0].text.strip()
    return jsonify({'bot_response': bot_response})

if __name__ == '__main__':
    app.run(debug=True)
