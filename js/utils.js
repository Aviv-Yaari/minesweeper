// Get a copy of mat
function copyMat(mat) {
  const newMat = [];
  for (let i = 0; i < mat.length; i++) {
    newMat[i] = [];
    for (let j = 0; j < mat[0].length; j++) {
      newMat[i][j] = { ...mat[i][j] };
    }
  }
  return newMat;
}
