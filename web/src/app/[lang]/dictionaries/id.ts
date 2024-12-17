import type { IDictionaries } from "@/types/dictionaries";

const id: IDictionaries = {
  head: {
    title: "Mandala Chain Hub",
    description:
      "Pintu gerbang Anda untuk mengelola aset dalam Ekosistem Rantai Mandala. Temukan kasus penggunaan inovatif dan terhubung dengan komunitas pengembang kami untuk membangun solusi on-chain.",
  },
  navigation: {
    dashboard: "dasbor",
    explorer: "jelajahi",
    documentation: "dokumentasi",
    community: "komunitas",
    home: "beranda",
    project: "proyek"
  },
  settings: {
    name: "pengaturan",
    theme: "tema",
    language: "bahasa",
  },
  drawer: {
    network: "jaringan",
    wallet: "dompet",
    select_wallet: "pilih dompet",
    change_network: "ubah jaringan",
    evm_wallets: "Dompet EVM",
    native_wallets: "Dompet Native",
    disconnect: "putuskan",
    connect: "sambungkan",
    show_balance: "Tampilkan Saldo",
    no_network_option: "Pilihan Jaringan Tidak Tersedia",
    no_wallet_installed: "tidak terpasang, mohon pasang setidaknya satu saja!",
  },
  dashboard: {
    average_block_time: "rerata waktu blok",
    total_blocks: "total blok",
    transactions_count: "jumlah transaksi",
    assets: "aset",
    token_empty: "belum ada token yang didaftarkan.",
    token_not_found: "token tidak ditemukan.",
    search: "Cari",
    news: "berita",
    see_more: "Lihat lainnya",
    wallet_not_yet_connect: {
      title: "Temukan pengalaman baru",
      description:
        "Hubungkan dompet Anda untuk mengakses semua fitur dan sepenuhnya terlibat dalam aplikasi kami. Petualangan Anda dimulai dengan satu klik!",
    },
    wallet: {
      copy_address: "Salin Alamat",
      explore_address: "Telusuri",
    },
  },
  project: {
    title: "Semua Proyek",
    search: {
      label: "Cari",
      placeholder: "Nama proyek",
    },
    filter: {
      label: "Filter dengan Tag",
      select_all: "Pilih Semua",
      reset: "Atur Ulang",
      placeholder: "Pilih Tag"
    },
    sort: {
      label: "Urutkan Berdasarkan",
      list: {
        name: "Nama",
        year: "Tahun",
        tvl: "TVL",
        total_users: "Jumlah Pengguna",
      }
    },
    card: {
      users: "Pengguna"
    },
    not_found: "Tidak ada proyek yang ditemukan, silahkan ubah pencarian",
    empty: "Belum ada proyek yang ditambahkan",
    item: {
      established_in: "Dibuat pada"
    }
  },
  modal_help: {
    title: "Gagal untuk Menghubungkan",
    description:
      "Banyak penyebab kenapa Anda tidak dapat menghubungkan dompet Anda. Coba saran berikut, jika tidak terselesaikan, Anda bisa bertanya pada komunitas.",
    list: {
      storage: {
        title: "Bersihkan Penyimpanan Lokal",
        description:
          "Ini berarti cache Portal Anda di browser ini akan dihapus.",
        button: "Bersihkan",
      },
      community: {
        title: "Tanyakan Komunitas Discord",
        description: "Seseorang selalu ada untuk membantumu.",
        button: "Bergabung",
      },
    },
  },
  toast: {
    success: {
      connect_wallet: "Berhasil Menghubungkan Dompet!",
      disconnect_wallet: "Berhasil Memutus Dompet!",
      address_copy: "Berhasil Menyalin!",
    },
    alert: {
      please_wait_network: "Silahkan Tunggu Sampai Terhubung Dengan Jaringan",
      disconnect_wallet_first:
        "Putus Koneksi Dompet Saat Ini Sebelum Menghubungkan Dengan Dompet Lainnya",
    },
    error: {
      connect_wallet: "Gagal Menghubungkan Dompet!",
      disconnect_wallet: "Gagal Memutus Dompet!",
      address_copy: "Gagal Menyalin!",
    },
  },
};

export default id;
