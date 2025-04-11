import os
from flask import Flask, render_template, send_from_directory, redirect, url_for

app = Flask(__name__, 
            static_url_path='/static',  # Changed this line
            static_folder='static',
            template_folder='templates')

# Main route handlers for primary pages
@app.route("/")
def home():
    """Home page route."""
    return render_template("index.html")

@app.route("/about")
def about():
    """About page route."""
    return render_template("about.html")

@app.route("/contact")
def contact():
    """Contact page route."""
    return render_template("contact.html")

@app.route("/demo")
def demo():
    """Demo request page route."""
    return render_template("demo.html")

# Solution pages
@app.route("/solutions")
def solutions():
    """Solutions overview page route."""
    return render_template("solutions.html")

@app.route("/solutions/conversational-ai")
def conversational_ai():
    """Conversational AI solution page."""
    return render_template("solutions/conversational-ai.html")

@app.route("/solutions/voice-bots")
def voice_bots():
    """Voice Bots solution page."""
    return render_template("solutions/voice-bots.html")

@app.route("/solutions/virtual-agents")
def virtual_agents():
    """Virtual Agents solution page."""
    return render_template("solutions/virtual-agents.html")

@app.route("/solutions/dialogflow-cx")
def dialogflow_cx():
    """Dialogflow CX solution page."""
    return render_template("dialogflow-cx.html")

# Company pages
@app.route("/careers")
def careers():
    """Careers page route."""
    return render_template("careers.html")

@app.route("/partners")
def partners():
    """Partners page route."""
    return render_template("partners.html")

# Blog pages
@app.route("/blog")
def blog():
    """Blog listing page route."""
    return render_template("blog.html")

@app.route("/blog/<post_slug>")
def blog_post(post_slug):
    """Individual blog post route with dynamic slug."""
    # This would typically check if the post exists and return 404 if not
    return render_template(f"blog-post.html", post_slug=post_slug)

# Resources pages
@app.route("/resources")
def resources():
    """Resources page route."""
    return render_template("resources.html")

@app.route("/case-study")
def case_study():
    """Case study page route."""
    return render_template("case-study.html")

# Legal pages
@app.route("/privacy-policy")
def privacy_policy():
    """Privacy policy page route."""
    return render_template("privacy-policy.html")

@app.route("/terms-of-service")
def terms_of_service():
    """Terms of service page route."""
    return render_template("terms-of-service.html")

@app.route("/pricing")
def pricing():
    """Pricing page route."""
    return render_template("pricing.html")

# Serve favicon
@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')

# Error handlers
@app.errorhandler(404)
def page_not_found(e):
    """Custom 404 error page handler."""
    return render_template('404.html'), 404

@app.errorhandler(500)
def server_error(e):
    """Custom 500 error page handler."""
    return render_template('500.html'), 500

if __name__ == "__main__":
    # Get port from environment variable or default to 8081
    port = int(os.environ.get("PORT", 8081))
    # Run the app, listening on all IPs (0.0.0.0)
    # Debug mode should be turned off for production
    app.run(debug=True, host="0.0.0.0", port=port)