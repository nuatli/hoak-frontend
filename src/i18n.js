import i18n from 'i18next';
import {initReactI18next}  from 'react-i18next';
import {register}  from 'timeago.js';

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


const timeagoTR =  (number,index) =>  {
   return [
        ["az önce", "şimdi"],
        ["%s saniye önce", "%s saniye içinde"],
        ["1 dakika önce", "1 dakika içinde"],
        ["%s dakika önce", "%s dakika içinde"],
        ["1 saat önce", "1 saat içinde"],
        ["%s saat önce", "%s saat içinde"],
        ["1 gün önce", "1 gün içinde"],
        ["%s gün önce", "%s gün içinde"],
        ["1 hafta önce", "1 hafta içinde"],
        ["%s hafta önce", "%s hafta içinde"],
        ["1 ay önce", "1 ay içinde"],
        ["%s ay önce", "%s ay içinde"],
        ["1 yıl önce", "1 yıl içinde"],
        ["%s yıl önce", "%s yıl içinde"]
    ][index]
}

register('tr',timeagoTR);


export default i18n;