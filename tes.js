const data = {
  provinsi: [
    {
      id: 1,
      provinsi: "Bali",
    },
  ],
  kabupaten: [
    {
      id: 1,
      prov_id: 1,
      kabupaten: "Jembrana",
    },
    {
      id: 2,
      prov_id: 1,
      kabupaten: "Tabanan",
    },
    {
      id: 3,
      prov_id: 1,
      kabupaten: "Badung",
    },
    {
      id: 4,
      prov_id: 1,
      kabupaten: "Denpasar",
    },
    {
      id: 5,
      prov_id: 1,
      kabupaten: "Buleleng",
    },
    {
      id: 6,
      prov_id: 1,
      kabupaten: "Gianyar",
    },
    {
      id: 7,
      prov_id: 1,
      kabupaten: "Bangli",
    },
    {
      id: 8,
      prov_id: 1,
      kabupaten: "Klungkung",
    },
    {
      id: 9,
      prov_id: 1,
      kabupaten: "Karangasem",
    },
  ],
  kecamatan: [
    {
      id: 1,
      kab_id: 1,
      kecamatan: "NEGARA",
    },
    {
      id: 2,
      kab_id: 1,
      kecamatan: "JEMBRANA",
    },
    {
      id: 3,
      kab_id: 1,
      kecamatan: "MENDOYO",
    },
    {
      id: 4,
      kab_id: 1,
      kecamatan: "PEKUTATAN",
    },
    {
      id: 5,
      kab_id: 1,
      kecamatan: "MELAYA",
    },
    {
      id: 6,
      kab_id: 2,
      kecamatan: "KERAMBITAN",
    },
    {
      id: 7,
      kab_id: 2,
      kecamatan: "PENEBEL",
    },
    {
      id: 8,
      kab_id: 2,
      kecamatan: "SELEMADEG",
    },
    {
      id: 9,
      kab_id: 2,
      kecamatan: "TABANAN",
    },
    {
      id: 10,
      kab_id: 2,
      kecamatan: "BATURITI",
    },
    {
      id: 11,
      kab_id: 2,
      kecamatan: "SELEMADEG TIMUR",
    },
    {
      id: 12,
      kab_id: 2,
      kecamatan: "KEDIRI",
    },
    {
      id: 13,
      kab_id: 2,
      kecamatan: "PUPUAN",
    },
    {
      id: 14,
      kab_id: 2,
      kecamatan: "SELEMADEG BARAT",
    },
    {
      id: 15,
      kab_id: 2,
      kecamatan: "MARGA",
    },
    {
      id: 16,
      kab_id: 3,
      kecamatan: "MENGWI",
    },
    {
      id: 17,
      kab_id: 3,
      kecamatan: "KUTA UTARA",
    },
    {
      id: 18,
      kab_id: 3,
      kecamatan: "ABIANSEMAL",
    },
    {
      id: 19,
      kab_id: 3,
      kecamatan: "PETANG",
    },
    {
      id: 20,
      kab_id: 3,
      kecamatan: "KUTA",
    },
    {
      id: 21,
      kab_id: 3,
      kecamatan: "KUTA SELATAN",
    },
    {
      id: 22,
      kab_id: 4,
      kecamatan: "DENPASAR UTARA",
    },
    {
      id: 23,
      kab_id: 4,
      kecamatan: "DENPASAR SELATAN",
    },
    {
      id: 24,
      kab_id: 4,
      kecamatan: "DENPASAR TIMUR",
    },
    {
      id: 25,
      kab_id: 4,
      kecamatan: "DENPASAR BARAT",
    },
    {
      id: 26,
      kab_id: 5,
      kecamatan: "GEROKGAK",
    },
    {
      id: 27,
      kab_id: 5,
      kecamatan: "SUKASADA",
    },
    {
      id: 28,
      kab_id: 5,
      kecamatan: "TEJAKULA",
    },
    {
      id: 29,
      kab_id: 5,
      kecamatan: "SERIRIT",
    },
    {
      id: 30,
      kab_id: 5,
      kecamatan: "BULELENG",
    },
    {
      id: 31,
      kab_id: 5,
      kecamatan: "BUSUNG BIU",
    },
    {
      id: 32,
      kab_id: 5,
      kecamatan: "SAWAN",
    },
    {
      id: 33,
      kab_id: 5,
      kecamatan: "BANJAR",
    },
    {
      id: 34,
      kab_id: 5,
      kecamatan: "KUBUTAMBAHAN",
    },
    {
      id: 35,
      kab_id: 6,
      kecamatan: "TAMPAKSIRING",
    },
    {
      id: 36,
      kab_id: 6,
      kecamatan: "SUKAWATI",
    },
    {
      id: 37,
      kab_id: 6,
      kecamatan: "UBUD",
    },
    {
      id: 38,
      kab_id: 6,
      kecamatan: "BLAHBATUH",
    },
    {
      id: 39,
      kab_id: 6,
      kecamatan: "TEGALLALANG",
    },
    {
      id: 40,
      kab_id: 6,
      kecamatan: "GIANYAR",
    },
    {
      id: 41,
      kab_id: 6,
      kecamatan: "PAYANGAN",
    },
    {
      id: 42,
      kab_id: 7,
      kecamatan: "SUSUT",
    },
    {
      id: 43,
      kab_id: 7,
      kecamatan: "BANGLI",
    },
    {
      id: 44,
      kab_id: 7,
      kecamatan: "TEMBUKU",
    },
    {
      id: 45,
      kab_id: 7,
      kecamatan: "KINTAMANI",
    },
    {
      id: 46,
      kab_id: 8,
      kecamatan: "NUSA PENIDA",
    },
    {
      id: 47,
      kab_id: 8,
      kecamatan: "BANJARANGKAN",
    },
    {
      id: 48,
      kab_id: 8,
      kecamatan: "KLUNGKUNG",
    },
    {
      id: 49,
      kab_id: 8,
      kecamatan: "DAWAN",
    },
    {
      id: 50,
      kab_id: 9,
      kecamatan: "RENDANG",
    },
    {
      id: 51,
      kab_id: 9,
      kecamatan: "ABANG",
    },
    {
      id: 52,
      kab_id: 9,
      kecamatan: "SIDEMEN",
    },
    {
      id: 53,
      kab_id: 9,
      kecamatan: "BEBANDEM",
    },
    {
      id: 54,
      kab_id: 9,
      kecamatan: "MANGGIS",
    },
    {
      id: 55,
      kab_id: 9,
      kecamatan: "SELAT",
    },
    {
      id: 56,
      kab_id: 9,
      kecamatan: "KARANGASEM",
    },
    {
      id: 57,
      kab_id: 9,
      kecamatan: "KUBU",
    },
  ],
  desa: [
    {
      id: 1,
      kec_id: 1,
      desa: "Cupel",
    },
    {
      id: 2,
      kec_id: 1,
      desa: "Dauhwaru",
    },
    {
      id: 3,
      kec_id: 1,
      desa: "Banjar Tengah",
    },
    {
      id: 4,
      kec_id: 1,
      desa: "Loloan Timur",
    },
    {
      id: 5,
      kec_id: 1,
      desa: "Baler Bale Agung",
    },
    {
      id: 6,
      kec_id: 1,
      desa: "Dangin Tukadaya",
    },
    {
      id: 7,
      kec_id: 1,
      desa: "Lelateng",
    },
    {
      id: 8,
      kec_id: 1,
      desa: "Kaliakah",
    },
    {
      id: 9,
      kec_id: 1,
      desa: "Yehkuning",
    },
    {
      id: 10,
      kec_id: 1,
      desa: "Pengambengan",
    },
    {
      id: 11,
      kec_id: 1,
      desa: "Baluk",
    },
    {
      id: 12,
      kec_id: 1,
      desa: "Budeng",
    },
    {
      id: 13,
      kec_id: 1,
      desa: "Tegal Badeng Timur",
    },
    {
      id: 14,
      kec_id: 1,
      desa: "Batu Agung",
    },
    {
      id: 15,
      kec_id: 1,
      desa: "Pendem",
    },
    {
      id: 16,
      kec_id: 1,
      desa: "Loloan Barat",
    },
    {
      id: 17,
      kec_id: 1,
      desa: "Berangbang",
    },
    {
      id: 18,
      kec_id: 1,
      desa: "Sangkaragung",
    },
    {
      id: 19,
      kec_id: 1,
      desa: "Perancak",
    },
    {
      id: 20,
      kec_id: 1,
      desa: "Banyu Biru",
    },
    {
      id: 21,
      kec_id: 1,
      desa: "Air Kuning",
    },
    {
      id: 22,
      kec_id: 1,
      desa: "Tegal Badeng Barat",
    },
    {
      id: 23,
      kec_id: 2,
      desa: "Dauhwaru",
    },
    {
      id: 24,
      kec_id: 2,
      desa: "Loloan Timur",
    },
    {
      id: 25,
      kec_id: 2,
      desa: "Dangin Tukadaya",
    },
    {
      id: 26,
      kec_id: 2,
      desa: "Pendem",
    },
    {
      id: 27,
      kec_id: 2,
      desa: "Yehkuning",
    },
    {
      id: 28,
      kec_id: 2,
      desa: "Budeng",
    },
    {
      id: 29,
      kec_id: 2,
      desa: "Batu Agung",
    },
    {
      id: 30,
      kec_id: 2,
      desa: "Perancak",
    },
    {
      id: 31,
      kec_id: 2,
      desa: "Sangkaragung",
    },
    {
      id: 32,
      kec_id: 2,
      desa: "Air Kuning",
    },
    {
      id: 33,
      kec_id: 3,
      desa: "Yehembang  Kangin",
    },
    {
      id: 34,
      kec_id: 3,
      desa: "Pohsanten",
    },
    {
      id: 35,
      kec_id: 3,
      desa: "Yeh Sumbul",
    },
    {
      id: 36,
      kec_id: 3,
      desa: "Penyaringan",
    },
    {
      id: 37,
      kec_id: 3,
      desa: "Delodberawah",
    },
    {
      id: 38,
      kec_id: 3,
      desa: "Mendoyo Dangin Tukad",
    },
    {
      id: 39,
      kec_id: 3,
      desa: "Yehembang  Kauh",
    },
    {
      id: 40,
      kec_id: 3,
      desa: "Mendoyo Dauh Tukad",
    },
    {
      id: 41,
      kec_id: 3,
      desa: "Yehembang",
    },
    {
      id: 42,
      kec_id: 3,
      desa: "Tegalcangkring",
    },
    {
      id: 43,
      kec_id: 3,
      desa: "Pergung",
    },
    {
      id: 44,
      kec_id: 4,
      desa: "Manggissari",
    },
    {
      id: 45,
      kec_id: 4,
      desa: "Pangyangan",
    },
    {
      id: 46,
      kec_id: 4,
      desa: "Asahduren",
    },
    {
      id: 47,
      kec_id: 4,
      desa: "Medewi",
    },
    {
      id: 48,
      kec_id: 4,
      desa: "Pengragoan",
    },
    {
      id: 49,
      kec_id: 4,
      desa: "Gumbrih",
    },
    {
      id: 50,
      kec_id: 4,
      desa: "Pekutatan",
    },
  ],
};

const dataKabupaten = data.kabupaten.map((kabupaten) => {
  const provinsi = data.provinsi.find((prov) => prov.id === kabupaten.prov_id);
  return {
    provinsi: provinsi ? provinsi.provinsi : null,
    ...kabupaten,
  };
});

const dataKecamatan = data.kecamatan.map((item) => {
  const kabupaten = data.kabupaten.find((kec) => kec.id === item.kab_id);
  return {
    kabupaten: kabupaten ? kabupaten.kabupaten : null,
    ...item,
  };
});

const dataDesa = data.desa.map((item) => {
  const kecamatan = data.kecamatan.find((key) => key.id === item.kec_id);
  return {
    kecamatan: kecamatan ? kecamatan.kecamatan : null,
    ...item,
  };
});
