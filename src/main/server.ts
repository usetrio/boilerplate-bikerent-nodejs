require('dotenv').config();
import app from '@/main/config/app';

app.listen(process.env.PORT || 5000, () => {
  console.log('Server running...');
});
