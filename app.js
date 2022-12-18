// console.log(process);

const yargs = require("yargs");
const contacts = require("./contacts");

yargs
  .command({
    command: "add",
    describe: "Menambahkan contact baru",
    builder: {
      nama: {
        describe: "Nama Lengkap",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Alamat email",
        demandOption: false,
        type: "string",
      },
      noHP: {
        describe: "No HP",
        demandOption: true,
        type: "string",
      },
    },
    handler: (argv) => {
      contacts.simpanContacts(argv.nama, argv.email, argv.noHP);
    },
  })
  .demandCommand();

//menampilkan daftar semua nama & No HP contact

yargs.command({
  command: "list",
  describe: "menampilkan semua nama & No HP",
  handler() {
    contacts.listContacts();
  },
});

yargs.command({
  command: "detail",
  describe: "Menampilkan detail sebuah contact berdasarkan nama",
  builder: {
    nama: {
      describe: "Nama Lengkap",
      demandOption: true,
      type: " string",
    },
  },

  handler(argv) {
    contacts.detailContacts(argv.nama);
  },
});

//menghapus contact berdasarkan nama

yargs.command({
  command: "delete",
  describe: "Menghaspus sebuah contact berdasarkan nama",
  builder: {
    nama: {
      describe: "Nama Lengkap",
      demandOption: true,
      type: " string",
    },
  },

  handler(argv) {
    contacts.deleteContacts(argv.nama);
  },
});

yargs.parse();

//console.log(yargs.argv);
// const contacts = require("./contacts");

// const main = async () => {
//   const nama = await contacts.pertanyaan("masukan nama: ");
//   const email = await contacts.pertanyaan("masukan email: ");
//   const noHP = await contacts.pertanyaan("Masukan no HP: ");

//   contacts.simpanContacts(nama, email, noHP);
// };

// main();
