const Counter = {
  data() {
    return {
      opf: localStorage.getItem('cl-opf') || 'IP',
      rno: localStorage.getItem('cl-rno') || 'USN6',


      checkVED: localStorage.getItem('cl-checkVED') || false,
      countSdel: localStorage.getItem('cl-countSdel') || 1,
      countSotrud: 0,


      tweenedNumber: 0,

      name: localStorage.getItem('cl-name') || '',
      phone: localStorage.getItem('cl-phone') || '',
      email: localStorage.getItem('cl-email') || '',
      placeName: 'Имя *',
      placePhone: '+7',
      placeEmail: 'ex@mail.ru',
      errorName: '',
      errorPhone: '',
      errorEmail: '',

      showBlock: false,

      message: null
    }
  },
  mounted() {
    setTimeout(() => {
      this.showBlock = true
    }, 500)
    setTimeout(() => {
      this.countSotrud = localStorage.getItem('cl-countSotrud') ? localStorage.getItem('cl-countSotrud') : 1
    }, 1000)
  },
  computed: {
    tarifType() {
      if (this.countSdel > 100) {
        return 'vip'
      } else if (this.countSdel > 50) {
        return 'нон-стоп'
      } else if (this.countSdel > 20) {
        return 'профессионал'
      } else if (this.countSdel > 10) {
        return 'уверенный'
      } else {
        return 'начинающий'
      }
    },
    basePrice() {
      return this.opf === 'IP' ? 2700 : 6000
    },
    priceVED() {

    },
    priceSdel() {
      if (this.opf === 'IP') {
        if (this.rno === 'USN15') {
          if (this.countSdel > 100) {
            return 999
          } else if (this.countSdel > 50) {
            return 17400 // +5300
          } else if (this.countSdel > 20) {
            return 12100 // +8200
          } else if (this.countSdel > 10) {
            return 3900
          } else {
            return 0
          }
        } else if (this.rno === 'OSN') {
          if (this.countSdel > 100) {
            return 999
          } else if (this.countSdel > 50) {
            return 21200 // +8000
          } else if (this.countSdel > 20) {
            return 13200 // +7100
          } else if (this.countSdel > 10) {
            return 6100
          } else {
            return 0
          }
        } else {
          if (this.countSdel > 100) {
            return 999
          } else {
            return 0
          }
        }
      } else {
        if (this.rno === 'USN15' || this.rno === 'USN6') {
          if (this.countSdel > 100) {
            return 999
          } else if (this.countSdel > 50) {
            return 17400 // +5300
          } else if (this.countSdel > 20) {
            return 12100 // +8200
          } else if (this.countSdel > 10) {
            return 3900
          } else {
            return 0
          }
        } else {
          if (this.countSdel > 100) {
            return 999
          } else if (this.countSdel > 50) {
            return 21200 // +8000
          } else if (this.countSdel > 20) {
            return 13200 // +7100
          } else if (this.countSdel > 10) {
            return 6100
          } else {
            return 0
          }
        }
      }
    },
    priceSotrud() {
      return this.countSotrud * 600
    },
    priceRNO() {
      if (this.opf === 'IP') {
        if (this.rno === 'USN15') {
          return 3300
        } else if (this.rno === 'OSN') {
          return 5500
        } else {
          return 0
        }
      } else {
        if (this.rno === 'OSN') {
          return 2200
        } else {
          return 0
        }
      }
    },
    totalSumm() {
      if (this.priceSdel !== 999) {
        if (this.checkVED) {
          return this.basePrice + this.priceSotrud + this.priceRNO + this.priceSdel + (this.basePrice + this.priceSotrud + this.priceRNO + this.priceSdel) * .25
        } else {
          return this.basePrice + this.priceSotrud + this.priceRNO + this.priceSdel
        }
      } else {
        return 999
      }

    },
    aNum() {
      if (this.tweenedNumber !== 999) {
        return new Intl.NumberFormat('ru-RU').format(this.tweenedNumber.toFixed(0))
      } else {
        return 'индивидуально'
      }
    }
  },
  methods: {
    sendMessage() {
      if (this.name && this.phone) {
        this.errorName = ''
        this.errorPhone = ''
        this.message = {
          name: this.name,
          phone: this.phone,
          email: this.email || 'не указан',
          opf: this.opf,
          rno: this.rno,
          ved: this.checkVED,
          countSdel: this.countSdel,
          countSotrud: this.countSotrud,
          tarif: this.tarifType,
          summa: this.aNum
        }

        console.log('mes:', this.message);

      } else if (!this.name && this.phone) {
        this.errorPhone = ''
        this.errorName = 'Поле обязательно для ввода'
      } else if (!this.phone && this.name) {
        this.errorName = ''
        this.errorPhone = 'Введите верный номер телефона'
      } else {
        this.errorName = 'Поле обязательно для ввода'
        this.errorPhone = 'Введите верный номер телефона'
      }
    },
    saveOPF() {
      localStorage.setItem('cl-opf', this.opf)
    },
    saveRNO() {
      localStorage.setItem('cl-rno', this.rno)
    },
    saveVED() {
      localStorage.setItem('cl-checkVED', this.checkVED)
    },
    saveSdel() {
      localStorage.setItem('cl-countSdel', this.countSdel)
    },
    saveSotrud() {
      localStorage.setItem('cl-countSotrud', this.countSotrud)
    },
    saveName() {
      localStorage.setItem('cl-name', this.name)
    },
    savePhone() {
      localStorage.setItem('cl-phone', this.phone)
    },
    saveEmail() {
      localStorage.setItem('cl-email', this.email)
    }
  },
  watch: {
    totalSumm(newValue) {
      gsap.to(this.$data, { duration: 0.5, tweenedNumber: newValue })
    }
  }
}


Vue.createApp(Counter).mount('#counter')