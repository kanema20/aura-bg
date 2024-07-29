const { removeBackground } = require('@imgly/background-removal-node');

async function removeImageBackground(imgSource) {
  const blob = await removeBackground(imgSource);
  const buffer = Buffer.from(await blob.arrayBuffer());
  const dataURL = `data:image/png;base64,${buffer.toString("base64")}`;
  return dataURL;
}


const imgSource = 'public/uploads/fdd82839-d4ce-4b75-99d6-fb394094921c_44674cb-Favicon_with_radius_400x400.png';
removeImageBackground(imgSource)
    .then(dataURL => console.log('Background removed:', dataURL))
    .catch(error => console.error('Error removing background:', error));