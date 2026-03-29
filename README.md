# 🏛️ ATHAR – Plateforme collaborative du patrimoine architectural

ATHAR est une application web collaborative dédiée à la **centralisation, l’enrichissement et la gestion du patrimoine architectural algérien**.
Elle permet aux experts et utilisateurs de **créer, annoter et explorer des projets patrimoniaux** à travers une plateforme moderne et interactive.

---

## 🚀 Fonctionnalités principales

### 👤 Gestion des utilisateurs

* Inscription (Visiteur / Expert)
* Authentification sécurisée avec JWT
* Validation des comptes experts par un administrateur

### 📁 Gestion de projets

* Création de projets architecturaux
* Organisation en sections (historique, architecture, etc.)
* Collaboration entre experts

### 🤝 Collaboration

* Annotation des contenus
* Gestion des conflits entre contributions
* Système de notifications

### ✍️ Éditeur enrichi

* Texte formaté
* Ajout d’images, vidéos, tableaux
* Références et liens externes

### 🔍 Recherche & exploration

* Recherche multicritère
* Navigation par discipline

### 🤖 Intelligence artificielle

* Annotation automatique d’images
* Chatbot pour assistance et informations

### 💾 Export & sauvegarde

* Export PDF
* Sauvegarde locale ou cloud

---

## 🛠️ Technologies utilisées

### Frontend

* React.js
* Tailwind CSS
* Vite

### Backend

* Node.js
* Express.js

### Base de données

* MongoDB (Mongoose)

### Outils & services

* Cloudinary (stockage images)
* Postman (tests API)
* JWT (authentification)
* Axios (requêtes HTTP)

---

## 🧱 Architecture du projet

```
/frontend
  /components
  /pages
  /assets

/backend
  /config
  /middlewares
  /models
  /routes
```

Architecture **monolithique** avec API REST.

---

## ⚙️ Installation

### 1. Cloner le projet

```bash
git clone https://github.com/ton-username/athar.git
cd athar
```

### 2. Installer les dépendances

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

---

### 3. Configuration

Créer un fichier `.env` dans le backend :

```env
PORT=5000
MONGO_URI=...
ACCESS_TOKEN_SECRET=...
REFRESH_TOKEN_SECRET=...
CLOUDINARY_API_KEY=...
CLOUDINARY_SECRET=...
```

---

### 4. Lancer le projet

#### Backend

```bash
npm run dev
```

#### Frontend

```bash
npm run dev
```

---

## 📡 API (exemples)

### Authentification

* `POST /auth/register`
* `POST /auth/login`

### Projets

* `GET /projects`
* `POST /projects`
* `PUT /projects/:id`
* `DELETE /projects/:id`

---

## 🔐 Sécurité

* Authentification via JWT
* Stockage sécurisé (HTTPOnly cookies)
* Gestion des rôles (Admin / Expert / Visiteur)
* Validation des données
* Protection contre XSS

---

## 📈 Améliorations futures

* 🌍 Géolocalisation des édifices
* 🏗️ Visualisation 3D
* 📱 Application mobile
* ✏️ Édition collaborative en temps réel

---

## 📄 Licence

Ce projet est académique (2CP – ESI).
Licence à définir.
