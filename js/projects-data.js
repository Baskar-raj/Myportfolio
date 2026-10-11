/* =====================================================================
   projects-data.js : ALL project content lives here (loaded before projects.js).
   Open projects.html?id=<id> to see a project.  To add one: copy an object, change id.
   PLACEHOLDERS to fill in for each project (empty = placeholder shown on the page):
     live   : "https://your-demo.vercel.app"     (Live demo button + live preview frame)
     repo   : "https://github.com/you/repo"      (Source code button)
     video  : "https://www.youtube.com/embed/VIDEO_ID"   (demo video)
     demo   : { user:"demo@site.com", pass:"demo123" }    (test login shown with copy buttons)
     links  : [["Documentation","https://..."], ...]       (extra resources; "" = placeholder)
     shots  : [["Caption","img/projects/<file>.png","contain"]]  (screenshots; 3rd item optional: contain = show whole image; missing file = mock-up)
     cover  : "img/projects/<file>.png"          (card image on the home page)
     phone  : ["Caption","img/projects/<file>"]    (optional portrait image for the phone frame)
     cat/d/star : card category, card text, Featured badge (home page cards are built from this file)
   Everything else (text, features, API, schema, code ...) is sample content: edit freely.
   ===================================================================== */
const PH_LINKS = [["Documentation",""],["Design (Figma)",""],["Project report",""]];
window.PROJECTS = [{id:"truthlens",cat:"AI/ML",star:1,cover:"img/projects/tl-home1.png",d:"A multimodal AI pipeline that detects manipulated images, localises the edit and checks whether the caption matches the photo.",
 pc:"#6d28d9",pc2:"#f472b6",cls:"b5",ic:"bi-search-heart",t:"TruthLens",sub:"Image Forgery and Caption Verification",tag:"Checks a post before it goes live: is the image manipulated, where was it edited, and does the caption tell the truth?",yr:"2026",role:"AI/ML Developer",dur:"Dissertation-II",team:"Solo (faculty guided)",status:"Completed",
 live:"https://baskarraj-vibe-ai-moderation-demo.hf.space",repo:"",video:"https://baskarraj-vibe-ai-moderation-demo.hf.space",demo:{user:"demo",pass:"1234"},links:[["Dissertation report",""],["Documentation",""],["Dataset sources",""]],
 tags:["Python","PyTorch","EfficientNet-B0","UNet++","CLIP","BERT","Flask"],
 over:"TruthLens is my MCA Dissertation-II project: A Multimodal Framework for Detecting Digital Image Manipulation and Deceptive Visual Narratives. Three models work together: EfficientNet-B0 classifies an image as authentic or forged, UNet++ with an EfficientNet-B5 encoder marks the edited pixels, and a CLIP plus BERT model verifies the caption.",
 prob:"Misinformation uses two tricks at once: an edited photo and a caption that misleads. Most research tackles only visual forgery, so a real photo with a false caption slips through.",
 sol:"A moderation pipeline. A fast classifier screens every image, segmentation runs only on suspected forgeries to show where they were edited, and a multimodal caption model compares the text with the picture. A Flask app blocks the post if either check fails.",
 goals:["Detect copy-move and splicing forgeries","Localise the manipulated region at pixel level","Catch captions that do not match the image","Combine all checks in one web moderation flow"],
 users:[["bi-person-circle","Content creator","Posts a photo with a caption.",["Upload an image","Write a caption","Get an instant verdict"]],["bi-shield-exclamation","Moderator","Reviews flagged posts.",["See the forgery heatmap","Read caption analysis","Trust a clear decision"]]],
 steps:[["Upload","Image and caption submitted"],["Classify","EfficientNet-B0: authentic or forged"],["Localise","UNet++ marks edited pixels"],["Verify","CLIP and BERT check the caption"],["Decide","Post allowed or blocked"]],
 feats:[["bi-shield-check","Forgery classifier","EfficientNet-B0 reaches 97.18% validation accuracy and 0.9718 weighted F1."],["bi-bounding-box","Pixel-level localisation","UNet++ with an EfficientNet-B5 encoder outlines where an image was edited."],["bi-chat-square-text","Caption verification","CLIP ViT-B/32 and BERT features reach 92.20% accuracy and 0.9244 F1."],["bi-fire","Heatmap and overlay","Probability map, forged-area overlay and bounding boxes for each detection."],["bi-lightning-charge","Efficient pipeline","The light classifier runs first, so the heavy segmentation model runs only when needed."],["bi-window-desktop","Flask web app","Post screen with live moderation report and clear decision."]],
 arch:[["Input","bi-cloud-arrow-up",["Image upload","Caption text","Resize and normalise"]],["Models","bi-cpu",["EfficientNet-B0 classifier","UNet++ (EfficientNet-B5)","CLIP + BERT verifier"]],["Output","bi-window",["Forgery verdict","Heatmap and mask","Caption verdict"]]],
 apiT:"Pipeline stages",api:[["CNN","EfficientNet-B0","Authentic or forged, balanced 4,020-image set"],["SEG","UNet++ / EfficientNet-B5","Pixel mask of the manipulated region at 384 x 384"],["NLP","CLIP ViT-B/32 + BERT","Correct or misleading caption from a 1280-d fused vector"],["XAI","Heatmap overlay","Probability map, forged-area percentage and boxes"],["WEB","Flask app","Upload, moderation report and post decision"]],
 schT:"Datasets and training",sch:[["Classifier","CASIA v2 authentic plus IMD2020 forged, 4,020 balanced images, 20 epochs"],["Segmentation","IMD2020 image and mask pairs, 1,708 train and 302 validation, 40 epochs, AdamW"],["Caption model","Flickr8k based, 40,000 samples, 80:20 split, 30 epochs, Adam 3e-4"],["Loss","Dice + weighted BCE + Focal for 6.01% forged pixels"]],
 code:{f:"pipeline.py (simplified)",l:"Python",s:`def moderate(image, caption):
    p_forged = classifier(image)            # EfficientNet-B0
    mask = None
    if p_forged > 0.5:
        mask = segmenter(image)             # UNet++ localises the edit
    p_caption = caption_model(image, caption)  # CLIP + BERT, 1 = correct

    blocked = p_forged > 0.5 or p_caption < 0.5
    return {
        "decision": "Post blocked" if blocked else "Post allowed",
        "forged_probability": float(p_forged),
        "caption_probability": float(p_caption),
        "mask": mask,
    }`},
 qual:[["bi-bullseye","Accuracy","97.18% forgery classification and 92.20% caption verification on held-out data."],["bi-balance-scale","Class imbalance","Only 6.01% of pixels are forged. A Dice + BCE + Focal loss and weighted sampling keep the model from predicting all background."],["bi-speedometer2","Efficiency","Mixed precision, 384 px inputs and a light first-stage classifier fit free Colab GPUs."],["bi-arrow-repeat","Reproducibility","Fixed random seed 42, best weights saved on validation mIoU or F1."]],
 tech:[["devicon-python-plain colored","Python"],["devicon-pytorch-original colored","PyTorch"],["devicon-opencv-plain colored","OpenCV"],["devicon-numpy-plain colored","NumPy"],["devicon-flask-original","Flask"],["devicon-jupyter-plain colored","Jupyter"]],
 time:[["Phase 1","Literature review and gap analysis of forgery and caption research"],["Phase 2","Dataset preparation: CASIA v2, IMD2020 and Flickr8k"],["Phase 3","Training the classifier, UNet++ segmenter and caption verifier on Google Colab"],["Phase 4","Evaluation and Flask web integration"]],
 chal:[["Extreme pixel imbalance","Only 6.01% of pixels are forged, so plain losses predicted background everywhere. A composite Dice, weighted BCE and Focal loss produced a best validation mIoU of 0.4017 and F1 of 0.5346."],["Limited GPU memory","UNet++ with an EfficientNet-B5 encoder is heavy. Mixed precision, batch size 4 and 384 px inputs made training fit on Colab."],["Believable false captions","Misleading captions had to be varied and balanced. Features were standard-scaled before fusion and negatives were sampled carefully."]],
 fut:["Better localisation of very small or subtle edits","Larger and more varied forgery datasets","Support for AI-generated images","Deployment as an API for social platforms"],
 stats:[["97.18%","Forgery classification"],["0.4017","Segmentation mIoU"],["92.2%","Caption verification"],["3","Models in one pipeline"]],
 phone:["Caption verdict","img/projects/tl-caption.jpg","contain"],
 shots:[["Upload and post screen","img/projects/tl-upload.jpg"],["Forgery localisation","img/projects/tl-result.png","contain"],["Caption verification","img/projects/tl-caption.jpg","contain"],["High-confidence forgery","img/projects/tl-forged.jpg","contain"],["System architecture","img/projects/tl-architecture.png","contain"],["Caption model confusion matrix","img/projects/tl-confusion.png","contain"]],real:1},
 
{id:"iras",cat:"AI/ML",star:1,cover:"img/projects/retinal-cover.png",d:"A unified deep-learning pipeline that validates fundus images, detects glaucoma, diabetic retinopathy and AMD, grades severity and explains every result.",
 pc:"#0f766e",pc2:"#22d3ee",cls:"b4",ic:"bi-eye",t:"IRAS",sub:"Retinal Disease Analysis",tag:"One pipeline for retinal screening: it rejects bad images, classifies Normal, Glaucoma, Diabetic Retinopathy and AMD, grades severity and shows why.",yr:"2025",role:"AI/ML Developer",dur:"Dissertation-I",team:"Solo (faculty guided)",status:"Completed",
 live:"",repo:"",video:"",demo:{user:"",pass:""},links:[["Dissertation report",""],["Documentation",""],["Dataset sources",""]],
 tags:["Python","TensorFlow","Keras","MobileNetV2","U-Net","DenseNet121","LIME","Flask"],
 over:"IRAS (Integrated Retinal Analysis System) is my MCA Dissertation-I project. It combines an autoencoder quality gate, a MobileNetV2 disease classifier, U-Net optic disc and cup segmentation, a DenseNet121 diabetic retinopathy grader and LIME explanations in one Flask web app.",
 prob:"Most retinal AI tools detect a single disease, give a bare yes or no, assume every upload is a clean fundus photo and cannot explain themselves. That limits trust and makes them hard to use for real screening.",
 sol:"A modular pipeline. An autoencoder filters non-fundus and poor-quality images first, MobileNetV2 names the disease, U-Net with DenseNet121 stage the severity, and LIME highlights the regions behind the prediction.",
 goals:["Reject non-fundus and low-quality images before diagnosis","Classify Normal, Glaucoma, DR and AMD in one system","Grade severity, not just presence of disease","Explain predictions so clinicians can verify them"],
 users:[["bi-person-badge","Ophthalmologist","Wants a fast second opinion.",["Upload a fundus image","Read the diagnosis and severity","Check the LIME heatmap"]],["bi-hospital","Screening centre","Needs to process many scans.",["Bad images rejected automatically","Consistent staging","Simple local web interface"]]],
 steps:[["Upload","PNG or JPG fundus image"],["Validate","Autoencoder checks image quality"],["Classify","MobileNetV2 names the disease"],["Stage","DenseNet121 or U-Net grades severity"],["Explain","LIME heatmap and report"]],
 feats:[["bi-funnel","Autoencoder quality gate","Reconstruction error decides whether an image is a usable fundus photo. ROC AUC of 0.9954."],["bi-bullseye","Multi-disease classifier","MobileNetV2 transfer learning separates Normal, AMD, DR and Glaucoma at 99% accuracy."],["bi-bar-chart-steps","Severity staging","DenseNet121 grades DR and U-Net derives glaucoma severity from the cup-to-disc ratio."],["bi-vignette","Optic disc and cup segmentation","Two U-Net models reach 98.6% and 97.9% validation accuracy."],["bi-lightbulb","Explainable results","LIME heatmaps show which retinal regions drove the prediction."],["bi-window-desktop","Flask web interface","Upload, live progress steps and a clear results page."]],
 arch:[["Input and quality","bi-funnel",["Image upload","Normalisation","Autoencoder gate"]],["Models","bi-cpu",["MobileNetV2 classifier","U-Net disc and cup","DenseNet121 DR grader"]],["Explain and serve","bi-window",["LIME heatmaps","VCDR severity","Flask web app"]]],
 apiT:"Pipeline stages",api:[["AE","Autoencoder gate","Rejects non-fundus or poor images using reconstruction error"],["CNN","MobileNetV2","Classifies Normal, Diabetic Retinopathy, Glaucoma or AMD"],["DR","DenseNet121","Grades DR as mild, moderate, severe or proliferative"],["SEG","U-Net (x2)","Segments optic disc and cup, then computes the cup-to-disc ratio"],["XAI","LIME","Heatmap of the regions behind the prediction"],["WEB","Flask app","Upload, progress steps and results page"]],
 schT:"Model summary",sch:[["Autoencoder","trained on about 361 valid fundus images, MSE reconstruction error, ROC AUC 0.9954"],["MobileNetV2","4 classes, transfer learning, 99% accuracy, F1 0.99"],["U-Net (disc, cup)","Drishti-GS1, batch 8, 50 epochs, Dice 0.95 and 0.93"],["DenseNet121","4 DR stages, augmentation for class balance, LIME explanations"]],
 code:{f:"quality_gate.py (simplified)",l:"Python",s:`import numpy as np

def is_fundus(img, autoencoder, threshold):
    """Reject images the autoencoder cannot reconstruct well."""
    x = np.expand_dims(img.astype("float32") / 255.0, axis=0)
    recon = autoencoder.predict(x, verbose=0)
    mse = float(np.mean((x - recon) ** 2))
    return mse <= threshold, mse

def analyse(img, ae, classifier, threshold):
    ok, mse = is_fundus(img, ae, threshold)
    if not ok:
        return {"status": "rejected", "reason": "Non-fundus image", "mse": mse}
    probs = classifier.predict(preprocess(img)[None], verbose=0)[0]
    label = CLASSES[int(np.argmax(probs))]
    return {"status": "ok", "diagnosis": label, "confidence": float(probs.max())}`},
 qual:[["bi-bullseye","Accuracy","99% overall accuracy and 0.99 F1 for the four-class classifier on held-out test images."],["bi-shield-check","Reliability","The quality gate stops blurry or non-retinal images from producing a misleading diagnosis."],["bi-lightbulb","Transparency","LIME heatmaps let clinicians see what the model looked at. They are approximate and need clinical validation."],["bi-laptop","Deployment","Runs locally through Flask. Models were trained with TensorFlow and Keras."]],
 tech:[["devicon-python-plain colored","Python"],["devicon-tensorflow-original colored","TensorFlow"],["devicon-keras-plain colored","Keras"],["devicon-opencv-plain colored","OpenCV"],["devicon-numpy-plain colored","NumPy"],["devicon-flask-original","Flask"]],
 time:[["Phase 1","Literature review of 40+ IEEE studies and research-gap analysis"],["Phase 2","Dataset collection (APTOS, Messidor, Drishti-GS1, AMDNet) and preprocessing"],["Phase 3","Training the autoencoder, MobileNetV2, U-Net and DenseNet121 models"],["Phase 4","LIME explainability, Flask integration and evaluation"]],
 chal:[["Non-fundus and low-quality images","Public datasets contain blurred and irrelevant images. An autoencoder trained only on clean fundus photos flags anything it cannot reconstruct, with the threshold chosen from the error distribution and checked with an ROC curve."],["Many diseases in one system","Each disease needs a different model. A cascade lets MobileNetV2 decide the disease first, then the matching specialist model (DenseNet121 or U-Net) stages its severity."],["Trusting the output","A bare label is not enough for clinicians. LIME heatmaps and severity staging make each prediction easier to check, while the report notes they are approximate."]],
 fut:["Add Grad-CAM views next to LIME","Train on larger multi-centre datasets","Cloud and mobile deployment for rural clinics and telemedicine","Clinical validation with ophthalmologists"],
 stats:[["99%","Classification accuracy"],["0.9954","Quality-gate ROC AUC"],["98.6%","Optic disc segmentation"],["4","Disease classes"]],
 phone:["Diagnosis and LIME","img/projects/iras-phone.jpg"],
 shots:[["Home and how it works","img/projects/iras-home.jpg"],["Diagnosis with LIME heatmap","img/projects/iras-result.jpg"],["Glaucoma segmentation","img/projects/iras-segment.jpg"],["Normal result","img/projects/iras-normal.jpg"],["Live progress steps","img/projects/iras-pipeline.jpg"],["Non-fundus rejection","img/projects/iras-nonfundus.jpg"],["Framework overview","img/projects/iras-unified.png","contain"]],real:1},
{id:"bluewaves",cat:"MERN",star:1,cover:"img/projects/bluewaves-cover.png",d:"A full online store with authentication, cart, orders and an admin dashboard built on the MERN stack.",pc:"#2563EB",pc2:"#38bdf8",cls:"b1",ic:"bi-bag-heart",t:"BlueWaves",sub:"E-Commerce Platform",tag:"A secure, fast online store with a full admin back office, built end to end on the MERN stack.",yr:"2025",role:"Full-Stack Developer",dur:"3 months",team:"Solo project",status:"Completed",
 live:"https:something.com",repo:"",video:"",demo:{user:"",pass:""},links:PH_LINKS,
 tags:["React","Node.js","Express","MongoDB","JWT","Bootstrap"],
 over:"BlueWaves is a complete online store. Shoppers browse products, manage a cart, check out and track orders, while admins manage inventory, orders and customers from a dashboard.",
 prob:"Small sellers need a store that is simple to run but still secure and fast. Off-the-shelf platforms were either too costly or too rigid to customise.",
 sol:"A MERN application with reusable React components, a REST API protected by JWT and a MongoDB schema designed around products, carts and orders.",
 goals:["Secure sign-up, login and role-based access","Cart and checkout that never lose items","Admin tools to manage products and orders","Mobile-first layout that loads quickly"],
 users:[["bi-bag","Shopper","Browses, searches and buys.",["Browse and filter","Manage cart","Place and track orders"]],["bi-shield-check","Admin","Runs the store day to day.",["Add and edit products","Update order status","View sales summary"]]],
 steps:[["Browse","Search and filter the catalogue"],["Add to cart","Cart saved to the account"],["Checkout","Address, summary, confirm"],["Track","Status updates per order"],["Manage","Admin fulfils and restocks"]],
 feats:[["bi-shield-lock","Secure authentication","Register, login and protected routes with JWT and hashed passwords."],["bi-cart3","Smart cart","Persistent cart with quantity updates and live totals."],["bi-box-seam","Order tracking","Follow each order from packed to delivered."],["bi-speedometer2","Admin dashboard","Add, edit and remove products and manage every order."],["bi-search","Search and filters","Find products by name, category and price."],["bi-phone","Fully responsive","Mobile-first layout with Bootstrap and custom CSS."]],
 arch:[["Client","bi-window",["React + Router","Context state","Bootstrap UI"]],["API","bi-hdd-network",["Express REST","JWT middleware","Validation"]],["Database","bi-database",["MongoDB Atlas","Mongoose models","Indexes"]]],
 apiT:"API endpoints",api:[["POST","/api/auth/register","Create an account"],["POST","/api/auth/login","Login and receive a JWT"],["GET","/api/products","List products with search, filter and paging"],["POST","/api/cart","Add or update a cart item"],["POST","/api/orders","Place an order from the cart"],["GET","/api/orders/mine","Orders of the logged-in user"],["PUT","/api/admin/orders/:id","Update order status (admin)"],["DELETE","/api/admin/products/:id","Remove a product (admin)"]],
 schT:"Data model",sch:[["users","name, email, passwordHash, role"],["products","title, price, stock, category, images[]"],["carts","user, items[{ product, qty }]"],["orders","user, items[{ product, priceSnapshot, qty }], status, total"]],
 code:{f:"middleware/auth.js",l:"JavaScript",s:`const jwt = require('jsonwebtoken');

exports.protect = (roles = []) => (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Not logged in' });
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    if (roles.length && !roles.includes(user.role))
      return res.status(403).json({ message: 'Forbidden' });
    req.user = user;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};`},
 qual:[["bi-shield-lock","Security","bcrypt hashing, expiring JWTs, input validation and strict CORS."],["bi-lightning-charge","Performance","Pagination, DB indexes and lazy-loaded images."],["bi-bug","Testing","Postman collections and a manual test matrix for every flow."],["bi-cloud-upload","Deployment","React on Vercel, API on Render, data on MongoDB Atlas."]],
 tech:[["devicon-react-original colored","React"],["devicon-nodejs-plain colored","Node.js"],["devicon-express-original","Express"],["devicon-mongodb-plain colored","MongoDB"],["devicon-bootstrap-plain colored","Bootstrap"],["devicon-git-plain colored","Git"]],
 time:[["Week 1","Requirements, wireframes and database schema"],["Weeks 2-5","REST API, authentication and product catalogue"],["Weeks 6-9","Cart, checkout, orders and admin dashboard"],["Weeks 10-12","Testing, responsive polish and deployment"]],
 chal:[["Keeping the cart in sync","Guest and logged-in carts had to merge after login. I stored the cart server-side and merged by product id."],["Designing the order schema","Orders keep a price snapshot so old orders never change when a product price does."],["Protecting admin routes","Role checks in middleware reject admin calls even if the UI is bypassed."]],
 fut:["Online payments with Stripe","Product reviews and ratings","Email notifications for order updates","Wishlist and recommendations"],
 stats:[["40+","REST endpoints"],["12","Reusable components"],["3","User roles"],["100%","Mobile responsive"]],
 shots:[["Home page","img/projects/bluewaves-cover.png"],["Product listing","img/projects/product-listing.png"],["Cart and checkout","img/projects/checkout.png"],["Admin dashboard","img/projects/Admin.png"]]},

{id:"edutrack",cat:"MERN",star:1,cover:"img/projects/edutrack-cover.png",d:"A multi-role platform where students, teachers and admins manage attendance, marks and timetables in real time.",pc:"#059669",pc2:"#34d399",cls:"b2",ic:"bi-mortarboard",t:"EduTrack",sub:"Academic Management System",tag:"One platform for attendance, marks, timetables and announcements, with a dashboard for every role.",yr:"2025",role:"Full-Stack Developer",dur:"4 months",team:"Solo project",status:"Completed",
 live:"",repo:"",video:"",demo:{user:"",pass:""},links:PH_LINKS,tags:["MERN","Role-based access","Charts","REST APIs"],
 over:"EduTrack brings attendance, marks, timetables and announcements into one place for students, teachers and administrators.",
 prob:"Schools often track academics across spreadsheets and paper, which makes reports slow, inconsistent and error-prone.",
 sol:"A multi-role MERN platform with separate dashboards, live updates and visual reports so everyone sees exactly what they need.",
 goals:["Replace paper and spreadsheets with one system","Give each role a focused dashboard","Make attendance entry take seconds","Turn raw marks into clear reports"],
 users:[["bi-person-workspace","Student","Tracks own progress.",["View attendance %","See marks and ranks","Read announcements"]],["bi-person-video3","Teacher","Runs the classroom.",["Mark attendance","Enter marks","Post notices"]],["bi-building-gear","Admin","Manages the school.",["Manage users and classes","Build timetables","View all reports"]]],
 steps:[["Login","Role decides the dashboard"],["Mark","Teacher records attendance"],["Grade","Marks entered per exam"],["Analyse","Charts and reports update"],["Notify","Students see updates"]],
 feats:[["bi-people","Three role dashboards","Students, teachers and admins each get a tailored view."],["bi-calendar-check","Attendance tracking","Teachers mark attendance in seconds; students see their percentage."],["bi-clipboard-data","Marks and reports","Enter marks once and generate class and student reports."],["bi-bell","Announcements","Instant notices to a class or the whole school."],["bi-bar-chart","Visual analytics","Charts that show attendance and performance trends."],["bi-lock","Role-based security","Every API route checks the user's role."]],
 arch:[["Dashboards","bi-window",["React + Router","Chart components","Role-based routes"]],["API","bi-hdd-network",["Express REST","JWT + role guard","Aggregation logic"]],["Database","bi-database",["MongoDB","Mongoose models","Compound indexes"]]],
 apiT:"API endpoints",api:[["POST","/api/auth/login","Login and role token"],["GET","/api/students/:id/attendance","Attendance summary for a student"],["POST","/api/attendance","Teacher submits class attendance"],["POST","/api/marks","Enter marks for an exam"],["GET","/api/reports/class/:id","Class performance report"],["GET","/api/timetable/:classId","Weekly timetable"],["POST","/api/announcements","Publish a notice"]],
 schT:"Data model",sch:[["users","name, email, passwordHash, role"],["classes","name, teacher, students[]"],["attendance","class, date, records[{ student, present }]"],["marks","student, subject, exam, score"],["announcements","title, body, audience, createdAt"]],
 code:{f:"controllers/reports.js",l:"JavaScript",s:`// Attendance percentage per student, computed inside MongoDB
const rows = await Attendance.aggregate([
  { $match: { class: classId } },
  { $unwind: '$records' },
  { $group: {
      _id: '$records.student',
      present: { $sum: { $cond: ['$records.present', 1, 0] } },
      total: { $sum: 1 } } },
  { $project: { percent: { $multiply: [{ $divide: ['$present', '$total'] }, 100] } } },
  { $sort: { percent: -1 } }
]);`},
 qual:[["bi-shield-lock","Security","Role guard on every route, hashed passwords and validated input."],["bi-lightning-charge","Performance","Aggregation pipelines and compound indexes for fast reports."],["bi-bug","Testing","API tested in Postman, UI tested per role."],["bi-cloud-upload","Deployment","Frontend and API hosted separately with MongoDB Atlas."]],
 tech:[["devicon-react-original colored","React"],["devicon-nodejs-plain colored","Node.js"],["devicon-express-original","Express"],["devicon-mongodb-plain colored","MongoDB"],["devicon-javascript-plain colored","JavaScript"],["devicon-git-plain colored","Git"]],
 time:[["Month 1","Roles, flows and database design"],["Month 2","Authentication, attendance and marks modules"],["Month 3","Timetable, announcements and dashboards"],["Month 4","Analytics, testing and deployment"]],
 chal:[["Modelling many roles","One user collection with a role field plus profile documents kept queries simple."],["Live updates","Dashboards refresh on actions and light polling to stay current without heavy load."],["Report performance","MongoDB aggregation pipelines replaced slow client-side calculations."]],
 fut:["Parent portal with notifications","Exam scheduling and hall tickets","PDF report cards","Mobile app with React Native"],
 stats:[["3","Role dashboards"],["25+","API endpoints"],["5","Report types"],["4","Months of work"]],
 shots:[["Student dashboard","img/projects/edutrack-student.png"],["Attendance","img/projects/edutrack-attendance.png"],["Marks and reports","img/projects/edutrack-reports.png"],["Admin panel","img/projects/edutrack-admin.png"]]},

{id:"devfolio",cat:"Frontend",cover:"img/projects/devfolio-cover.png",d:"This portfolio: a scroll-guided site with an eye-tracking avatar, animated journey and detailed case-study pages.",pc:"#7c3aed",pc2:"#f59e0b",cls:"b3",ic:"bi-stars",t:"DevFolio",sub:"Interactive Portfolio",tag:"A portfolio that feels alive: an eye-tracking guide avatar, animated journey and case-study pages, with no framework.",yr:"2026",role:"Designer and Developer",dur:"2 weeks",team:"Solo project",status:"Live",
 live:"",repo:"",video:"",demo:{user:"",pass:""},links:PH_LINKS,tags:["HTML","CSS","JavaScript","Bootstrap"],
 over:"DevFolio is this portfolio: a scroll-guided site where a small avatar tracks the mouse with its eyes and moves from side to side between sections.",
 prob:"Most portfolios are static lists. I wanted one that feels alive and memorable while staying fast and accessible.",
 sol:"A lightweight site with no framework: Bootstrap for layout, custom CSS for motion and one small JavaScript file for the avatar, journey map and page transitions.",
 goals:["Stand out without hurting performance","Guide visitors section by section","Showcase work with real case studies","Work on every screen and respect reduced motion"],
 users:[["bi-person-check","Recruiter","Wants proof quickly.",["Scan skills","Open case studies","Download resume"]],["bi-people","Visitor","Explores and gets in touch.",["Follow the guide","View certificates","Send a message"]]],
 steps:[["Land","Hero with clear role and goals"],["Explore","Guide avatar leads the scroll"],["Dive in","Open a project or certificate"],["Verify","Live demo and credentials"],["Connect","Contact form and resume"]],
 feats:[["bi-eye","Eye-tracking avatar","Glowing eyes follow the mouse and look toward the next section."],["bi-signpost-split","Interactive journey","Click a milestone to walk the road and open its card."],["bi-moon-stars","Light and dark theme","Remembered between visits."],["bi-layout-sidebar","Hover sidebar","Icons that expand into labels on hover."],["bi-patch-check","Certificate full view","Large certificate previews with all the details."],["bi-universal-access","Accessible","Keyboard focus and reduced-motion support."]],
 arch:[["Markup","bi-filetype-html",["Semantic HTML","Bootstrap grid","Data-driven cards"]],["Style","bi-palette",["CSS variables","Theme tokens","Keyframe motion"]],["Script","bi-filetype-js",["Eye tracking","Scroll guide","Page curtain"]]],
 apiT:"Key modules",api:[["JS","eye tracking","requestAnimationFrame loop moves the pupils toward the pointer"],["JS","scroll guide","Moves the avatar between left and right per section"],["JS","journey map","Walker follows an SVG path using getPointAtLength"],["JS","reveal + tilt","IntersectionObserver reveals and 3D card tilt"],["JS","page curtain","Animated transition between pages"]],
 schT:"Design tokens",sch:[["Brand","#2563EB blue, #F59E0B amber"],["Neutrals","#0F172A text, #64748B slate, #F8FAFC background"],["Type","Poppins for UI, Caveat for handwritten notes"],["Motion","Cubic-bezier ease, honours prefers-reduced-motion"]],
 code:{f:"js/main.js",l:"JavaScript",s:`// eyes follow the pointer, clamped to 5px of travel
(function look() {
  bots.forEach(b => {
    const r = b.getBoundingClientRect();
    const dx = mx - (r.left + r.width / 2), dy = my - (r.top + r.height / 2);
    const d = Math.hypot(dx, dy) || 1, k = Math.min(d / 8, 1) * 5;
    b.querySelectorAll('.eye').forEach(e =>
      e.style.transform = \`translate(\${dx / d * k}px, \${dy / d * k}px)\`);
  });
  requestAnimationFrame(look);
})();`},
 qual:[["bi-shield-lock","Privacy","No trackers and no third-party scripts beyond CDNs."],["bi-lightning-charge","Performance","No framework, lazy reveals and tiny JS."],["bi-universal-access","Accessibility","Keyboard focus, contrast and reduced motion."],["bi-cloud-upload","Deployment","Static hosting on GitHub Pages or Netlify."]],
 tech:[["devicon-html5-plain colored","HTML5"],["devicon-css3-plain colored","CSS3"],["devicon-javascript-plain colored","JavaScript"],["devicon-bootstrap-plain colored","Bootstrap"],["devicon-git-plain colored","Git"],["devicon-vscode-plain colored","VS Code"]],
 time:[["Day 1-2","Design reference, palette and layout"],["Day 3-7","Sections, avatar and animations"],["Day 8-11","Project and certificate pages"],["Day 12-14","Polish, accessibility and testing"]],
 chal:[["Smooth avatar travel","Scroll position and the left/right zig-zag needed separate transforms so the motion never fights itself."],["Keeping it light","No frameworks and data-driven cards keep the site tiny."],["Motion with restraint","Everything respects prefers-reduced-motion."]],
 fut:["Blog section with markdown posts","Contact form backend","Multi-language support","Analytics dashboard"],
 stats:[["0","Frameworks"],["3","Case-study pages"],["60+","Lighthouse performance"],["100%","Responsive"]],
 shots:[["Hero","img/projects/devfolio-hero.png"],["Journey","img/projects/devfolio-journey.png"],["Certificates","img/projects/devfolio-certs.png"],["Projects","img/projects/devfolio-projects.png"]]},

];
