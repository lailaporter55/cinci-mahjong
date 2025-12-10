const handleError = (message) => {
  document.getElementById('errorMessage').textContent = message;
}

/* Sends post requests to the server using fetch. Will look for various
   entries in the response JSON object, and will handle them appropriately.
*/
const sendPost = async (url, data, handler) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  document.getElementById('partyMessage').classList.add('hidden');

  if (result.redirect) {
    window.location = result.redirect;
  }

  if (result.error) {
    handleError(result.error);
  }

  if (handler) {
    handler(result);
  }
};

const hideError = () => {
  document.getElementById('errorMessage').classList.add('hidden');
};

//form data for file uploads
const sendFormDataPost = async (url, FormData, handler) => {
  try{
    const response = await fetch(url, {
      method: 'POST', 
      body: FormData,
    });
    const result = await response.json(); 
    if(result.redirect) window.location = result.redirect; 
    if(result.error) handleError(result.error); 
    if(handler) handler(result);
  }catch(err){
    handleError("Network error: upload failed"); 
    console.error(err);
  }
};

module.exports = {
  handleError,
  sendPost,
  hideError,
  sendFormDataPost,
};