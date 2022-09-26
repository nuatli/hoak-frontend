import i18n from 'i18next';
import {initReactI18next}  from 'react-i18next';

i18n.use(initReactI18next).init({
    resources:{
        en:{
            translations:{
                'Sign Up': 'Sign Up',
                'Password Mismatch':'Password Mismatch',
                'Username':'Username',
                'Display Name':'Display Name',
                'Password':'Password',
                'Password Repeat':'Password Repeat',
                'Login':'Login',
                'Logout':'Logout',
                'Users':'Users',
                'Load Failure':'Load Failure',
                'User not Found':'User not Found',
                'Edit':'Edit',
                'Cancel':'Cancel',
                'Save':'Save',
                'Change Display Name':'Change Display Name',
                'MyProfile':'My Profile',
                'There are no hoaxes':'There are no hoaxes',
                'Load Old Hoaxes':'Load Old Hoaxes'
           }
        },
        tr:{
            translations:{
                'Sign Up': 'Kayıt Ol',
                'Password Mismatch':'Aynı Şifreyi Giriniz',
                'Username':'Kullanıcı Adı',
                'Display Name':'Tercih Edilen Ad',
                'Password':'Şifre',
                'Password Repeat':'Şifre Tekrarı',
                'Login':'Giriş',
                'Logout':'Çıkış',
                'Users':'Kullanıcılar',
                'Load Failure':'Liste Alınamadı',
                'User not Found':'Kullanıcı Bulunamadı',
                'Edit':'Düzenle',
                'Cancel':'İptal',
                'Save':'Kaydet',
                'Change Display Name':'Görünen adınızı değiştirin',
                'MyProfile':'Profilim',
                'There are no hoaxes':'Hoax Bulunamadı',
                'Load Old Hoaxes':'Geçmiş Hoaxları getir'
                
            } 
        }
    },
    fallbackLng: 'en',
    ns:['translations'],
    defaultNS:'translations',
    keySeparator:false,
    interpolation:{
        escapeValue:false,
        formatSeparator: ','
    },
    react:{
        wait:true
    }
});

export default i18n;