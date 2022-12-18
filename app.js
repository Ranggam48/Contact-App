const yargs = require("yargs");
const contacts = require("./contacts");

//Menambahkan kontak baru

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

//Menampilkan daftar semua nama & No HP contact

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

//Menghapus contact berdasarkan nama

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
