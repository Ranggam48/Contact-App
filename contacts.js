const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");

// membuat folder data jika belum ada
const dirPath = "./data";

if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// membuat file contacts.json jika belum ada
const dataPath = "./data/contacts.json";

if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

// fungsi untuk load contact yang telah disimpan pada file json
const loadContacts = () => {
  const fileBuffer = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(fileBuffer);
  return contacts;
};

// fungsi untuk menambahkan contact pada file json
const simpanContacts = (nama, email, noHP) => {
  const data = { nama, email, noHP };
  const contacts = loadContacts();

  //cek duplikat
  const duplikat = contacts.find((contacts) => contacts.nama === nama);
  if (duplikat) {
    console.log(chalk.red.inverse.bold("nama sudah terdaftar"));
    return false;
  }

  if (email) {
    const cekEmail = validator.isEmail(email);
    if (!cekEmail) {
      console.log(chalk.red.inverse.bold("email salah"));
      return false;
    }
  }
  contacts.push(data);
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
  console.log("terimakasih sudah mendaftar");
};

//fungsi untuk menampilkan list kontak yang telah tersimpan
const listContacts = () => {
  const contacts = loadContacts();

  contacts.forEach((element, i) => {
    console.log(`${i + 1}. ${element.nama} - ${element.noHP}`);
  });
};

// fungsi untuk menampilkan detail dari kontak dengan parameter nama
const detailContacts = (nama) => {
  const contacts = loadContacts();

  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );

  if (!contact) {
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan`));
    return false;
  }

  console.log(chalk.cyan.inverse.bold(`${contact.nama}`));
  console.log(contact.noHP);
  if (contact.email) {
    console.log(contact.email);
  }
};

//fungsi untuk menghapus kontak dengan parameter nama
const deleteContacts = (nama) => {
  const contacts = loadContacts();

  const newContacts = contacts.filter(
    (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
  );

  if (contacts.length == newContacts.length) {
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan`));
    return false;
  }

  fs.writeFileSync("data/contacts.json", JSON.stringify(newContacts));
  console.log(`${nama} berhasil di hapus`);
};

module.exports = {
  simpanContacts,
  listContacts,
  detailContacts,
  deleteContacts,
};
