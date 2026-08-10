const MAIN_FOLDER_ID = "1EcYbzlqjZWaRBCAiqQ1bv2rSmt8f49cF";

function doGet(e) {
  const nama = (e && e.parameter && e.parameter.nama) ? e.parameter.nama.trim().toLowerCase() : "";

  if (!nama) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, message: "Nama tidak boleh kosong" }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  try {
    const folder = DriveApp.getFolderById(MAIN_FOLDER_ID);
    const files = folder.getFiles();
    let resultList = [];

    while (files.hasNext()) {
      let file = files.next();
      let fileName = file.getName();
      
      // Pencarian tidak peka huruf besar/kecil (case-insensitive)
      if (fileName.toLowerCase().indexOf(nama) !== -1) {
        resultList.push({
          id: file.getId(),
          name: fileName,
          url: file.getUrl(),
          downloadUrl: `https://drive.google.com/uc?export=download&id=${file.getId()}`
        });
      }
    }

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      data: resultList
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
