import animationView from './animation.js';


export default class physics extends animationView {
    constructor() {
        super();
    }

    getThuocTinh = (name) => {
        let thuoctinh = {
            '_haki' : ['Haki vũ trang','%'],
            'haki' : ['Haki vũ trang',''],
            'sat_thuong_phep' : ['Sát thương phép',''],
            '_sat_thuong_phep' : ['Sát thương phép','%'],
            'sat_thuong_vat_ly' : ['Sát thương vật lý',''],
            '_sat_thuong_vat_ly' : ['Sát thương vật lý','%'],
            'khang_phep' : ['Kháng phép',''],
            '_khang_phep' : ['Kháng phép','%'],
            'khang_vat_ly' : ['Kháng vật lý',''],
            '_khang_vat_ly' : ['Kháng vật lý','%'],
            'hpmax' : ['Máu',''],
            '_hpmax' : ['Máu','%'],
            'mpmax' : ['Năng lượng',''],
            '_mpmax' : ['Năng lượng','%'],
            'hoi_chieu' : ['Hồi chiêu',' mili giây'],
            '_chi_mang' : ['Tỉ lệ chí mạng','%'],
            '_sat_thuong_chi_mang' : ['Sát thương chí mạng','%'],
            '_giam_sat_thuong_chi_mang' : ['Giảm sát thương chí mạng','%'],
            '_hoi_mau' : ['Hồi máu mỗi 15 giây','%'],
            '_hoi_mp' : ['Hồi năng lượng mỗi 15 giây','%'],
            '_tru_hp' : ['Giảm máu mỗi 1 giây','%'],


        }
        if(thuoctinh[name]) {
            return {
                name : thuoctinh[name][0],
                value : thuoctinh[name][1]
            }
        }
        else
        {
            return {
                name : name,
                value : ''
            }
        }
    }

    number_format(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }

    collide = (ob1, ob2, key = false) => {
        ob1 = ob1.getBounds();
        ob2 = ob2.getBounds();

        if (ob1.x < ob2.x + ob2.width &&
            ob1.x + ob1.width > ob2.x &&
            ob1.y < ob2.y + ob2.height &&
            ob1.y + ob1.height > ob2.y) {
            return true;
        }
        return false;
    }

    collideMove = (ob1, ob2, key = false,speed) => {
        ob1 = ob1.getBounds();
        ob2 = ob2.getBounds();

        if(key == 'up') {
            ob1.y += ob1.height;
        }

        if(key == 'down') {
            //ob1.y += speed;
        }

        if(key == 'right' || key == 'left') {
            ob1.y += ob1.height;
        }

        if (ob1.x < ob2.x + ob2.width &&
            ob1.x + ob1.width > ob2.x &&
            ob1.y < ob2.y + ob2.height &&
            ob1.y + ob1.height > ob2.y) {
            return true;
        }
        return false;
    }

    hitTestRectangleDown(sprite1, sprite2, speed) {
        const rectangle1 = sprite1.getBounds();
        if(!rectangle1) return false;
        const rectangle2 = sprite2.getBounds();
        rectangle2.x = rectangle2.x + rectangle2.width;
        if(!rectangle2) return false;
        if(move != 0) {
            if(move == 'right') rectangle1.x += td;
            if(move == 'left') rectangle1.x -= td;
            if(move == 'up') rectangle1.y -= td;
            if(move == 'down') rectangle1.y += td;
        }



        return rectangle1.x < rectangle2.x + rectangle2.width &&
            rectangle1.x + rectangle1.width > rectangle2.x &&
            rectangle1.y < rectangle2.y + rectangle2.height &&
            rectangle1.y + rectangle1.height > rectangle2.y;
    }

    dx = (x1, y1, x2, y2) => {
        let dx = x1 - x2;
        let dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);
    }

    distanceXY = (x1, y1, x2, y2) => {
        let dx = x1 - x2;
        let dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);
    }

    circleCollision = (c1, c2) => {
        return this.distance(c1.x, c1.y, c2.x, c2.y) <= c1.radius + c2.radius;
    }

    circlePointCollision = (x, y, circle) => {
        return this.distance(x, y, circle.x, circle.y) < circle.radius;
    }

    pointInRect = (x, y, rect) => {
        return this.inRange(x, rect.x, rect.x + rect.width) &&
            this.inRange(y, rect.y, rect.y + rect.height);
    }


    getTime = () => {
        const inputTimezone = 'Asia/Ho_Chi_Minh';
        const date = new Date().toLocaleString('en-US', { timeZone: inputTimezone });
        let unixTimestamp = Math.floor(new Date(date).getTime());
        return unixTimestamp;
    }

    coverTime = (time) => {
        let timeHave = this.getTime() - time;
        timeHave = Math.abs(Math.round(timeHave/1000));
        if(timeHave <= 60) return timeHave + 's';
        if(timeHave > 60 && timeHave <= 3600) return Math.round(timeHave/60) + 'm';
        if(timeHave > 3600 && timeHave <= 86400) return Math.round(timeHave/3600) + 'h';
        if(timeHave > 86400 && timeHave <= 604800) return Math.round(timeHave/86400) + 'd';
        if(timeHave > 604800 && timeHave <= 2592000) return Math.round(timeHave/604800) + 'w';
        if(timeHave > 2592000 && timeHave <= 31536000) return Math.round(timeHave/2592000) + 'm';
        if(timeHave > 31536000) return Math.round(timeHave/31536000) + 'y';
    }

    checkDanh = (eff) => {
        /*
        * @int04
        * @return true
        * @desc: kiểm tra xem nhân vật có dính hiệu ứng cấm tấn công hay không
        * @return : true nếu được đánh, false neus không được
        *
        * */
        if(typeof eff != 'object' || !eff || eff.length <=0) return true;
        let status = true;
        for(let i = 0; i < eff.length; i++) {
            let elementEFF = eff[i];
            let idSkill = elementEFF[0];
            let j = elementEFF[1];
            let infoSkill = this.skill.find(e => e.id === idSkill);
            if(infoSkill) {
                if(infoSkill.buff && typeof infoSkill.buff == 'object') {
                    let getdata = infoSkill.buff[j];
                    if(getdata) {
                        let objectGet = getdata[6];
                        objectGet = objectGet || [0,0];
                        if(objectGet[1] == 1) {
                            status = false;
                            break;
                        }
                    }
                }
            }
        }
        return status;
    }

    checkDi =(eff) => {
        /*
        *
        * @int04
        * @method: method
        * @desc: Kiểm tra xem nhân vật có dính hiệu ứng đi không
        * @return: được đi => true, không => false
        *
        * */
        if(typeof eff != 'object' || !eff || eff.length <=0) return true;
        let status = true;
        for(let i = 0; i < eff.length; i++) {
            let elementEFF = eff[i];
            let idSkill = elementEFF[0];
            let j = elementEFF[1];
            let infoSkill = this.skill.find(e => e.id === idSkill);
            if(infoSkill) {
                if(infoSkill.buff && typeof infoSkill.buff == 'object') {
                    let getdata = infoSkill.buff[j];
                    if(getdata) {
                        let objectGet = getdata[6];
                        objectGet = objectGet || [0,0];
                        if(objectGet[0] == 1) {
                            status = false;
                            break;
                        }
                    }
                }
            }
        }
        return status;
    }

    isMenu = () => {
        if(this.box && this.box.children.length >=1) return false;
        if(this.boxGiaoTiep && this.boxGiaoTiep.children.length >=1) return false;
        if(this.menu && this.menu.children.length >=1) return false;
        if(this.menuLeft && this.menuLeft.children.length >=1) return false;
        if(this.danh  && this.danh === true) return false;
        if(this.input && this.input.children.length >=1) return false;
    }
    isDi = (eff = []) => {
        let my = this.my;
        if(my.id <=0) return false;
        if(this.isMenu() === false) return false;
        return this.checkDi(eff);
    }
    isAttack = (eff = []) => {
        let my = this.my;
        if(my.id <=0) return false;
        if(this.isMenu() === false) return false;
        return this.checkDanh(eff);
    }




}