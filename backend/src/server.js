const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

// Middlewares
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage: storage });

app.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await prisma.user.create({
      data: { name, email }
    });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ error: 'Erro ao criar usuário ou e-mail já existente.' });
  }
});

app.post('/posts', upload.array('images', 5), async (req, res) => {
  try {
    const { title, content, authorId } = req.body;

    const imageRecords = req.files ? req.files.map((file) => ({
      url: `/uploads/${file.filename}`
    })) : [];

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        authorId,
        images: {
          create: imageRecords
        }
      },
      include: {
        images: true,
        author: true
      }
    });

    return res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: 'Erro ao criar post com imagens.' });
  }
});

app.get('/posts', async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: { select: { id: true, name: true, email: true } },
        images: true
      },
      orderBy: { createdAt: 'desc' }
    });
    return res.json(posts);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar posts.' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});