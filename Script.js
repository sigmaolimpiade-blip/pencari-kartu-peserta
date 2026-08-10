// Ganti dengan URL Web App dari Google Apps Script Anda
const WEB_APP_URL = "PASTE_WEB_APP_URL_DI_SINI";

document.getElementById('searchForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const nama = document.getElementById('nama').value.trim();
  const sekolah = document.getElementById('sekolah').value;
  const statusDiv = document.getElementById('status');
  const resultDiv = document.getElementById('result');

  statusDiv.innerText = "Mencari berkas di Google Drive...";
  resultDiv.innerHTML = "";

  try {
    const response = await fetch(`${WEB_APP_URL}?nama=${encodeURIComponent(nama)}&sekolah=${encodeURIComponent(sekolah)}`);
    const data = await response.json();

    if (!data.success) {
      statusDiv.innerText = "Terjadi kesalahan saat melakukan pencarian.";
      return;
    }

    if (data.data.length === 0) {
      statusDiv.innerText = "Kartu peserta tidak ditemukan. Pastikan ejaan nama sudah benar.";
      return;
    }

    statusDiv.innerText = "";
    data.data.forEach(file => {
      const item = document.createElement('div');
      item.className = 'result-item';
      item.innerHTML = `
        <p><strong>${file.name}</strong></p>
        <div class="action-buttons">
          <a href="${file.url}" target="_blank" class="btn btn-view">Pratinjau</a>
          <a href="${file.downloadUrl}" target="_blank" class="btn btn-download">Unduh PDF</a>
        </div>
      `;
      resultDiv.appendChild(item);
    });

  } catch (err) {
    console.error(err);
    statusDiv.innerText = "Gagal terhubung ke server.";
  }
});
