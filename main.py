from flask import Flask, request, redirect
from flask import render_template, flash, url_for
from werkzeug.utils import secure_filename
import os
from tinydb import TinyDB, Query
app = Flask(__name__)

app.debug = True
db = TinyDB("db.json")
global_data = db.table("markers")
app.config["SECRET_KEY"] = "123123"
UPLOAD_FOLDER = 'static\img'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/')
def main():
    global global_data
    return render_template("main.html", data=global_data.all())


@app.route('/addLocation', methods=["GET", "POST"])
def addLocation():
    global global_data
    if request.method == 'POST':
        if 'img' not in request.files:  # hier ist ein fehler
            flash('No file part')
            return redirect(request.url)
        img = request.files['img']
        if img.filename == '':
            flash('No selected file')
        if img and allowed_file(img.filename):
            filename = secure_filename(img.filename)
            data = dict(request.form)
            filename = data.get("name") + "_" + filename
            data["category"] = [c.strip()
                                for c in data["category"].split(",") if c.strip() != ""]
            data["filename"] = filename
            global_data.insert(data)
            img.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return render_template("main.html", data=global_data.all())

    return render_template("addLocation.html")


if __name__ == '__main__':
    app.run()
