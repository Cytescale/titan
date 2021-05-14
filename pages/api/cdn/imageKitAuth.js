
const ImageKit = require('imagekit');
 import _URLS from '../../../util/imagekit-cert';
const imagekit = new ImageKit({
     urlEndpoint: _URLS.urlEndpoint,
     publicKey: 'public_/DkOKC6N0KqktP0jSpjDTtKpiTA=',
     privateKey: 'private_LgxIx1g7AY/LeX7jtJBlh1Pmis8='
   });   
export default async (req, res) => {
     var result = imagekit.getAuthenticationParameters();
     res.send(result);
}