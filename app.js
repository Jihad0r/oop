function getItem(select) {
    let element = document.querySelector(select);
    if (element) {
        return element
    }
}

class Gallery{
    constructor(ele) {
        this.container = ele;
        console.log(this.container)
        this.list = [...ele.querySelectorAll(".img")]; 
        console.log(this.list)

        this.moDal = getItem(".modal-content")
        this.timesBtn = getItem(".fa-times")
        this.liftBtn = getItem(".fa-chevron-left")
        this.rightBtn = getItem(".fa-chevron-right")
        this.naMe = getItem(".image-name")
        this.chOOsen = getItem(".main-img")
        this.modalImages = getItem(".modal-images")



        this.times = this.times.bind(this)
        this.lift = this.lift.bind(this)
        this.right = this.right.bind(this)
        this.choImg = this.choImg.bind(this)


        this.container.addEventListener("click", function (e) {
            if (e.target.classList.contains("img")) {
                this.newModal(e.target, this.list);
            }
        }.bind(this));

    }
    newModal(selectedImg, list) {
        this.selectedImage(selectedImg)
        this.modalImages.innerHTML = list.map(function (img) {
            return `<img src="${img.src}" title="${img.title}" data-id="${img.dataset.id}" class="${selectedImg.dataset.id === img.dataset.id ? 'modal-img selected' : 'modal-img'}"/>`;
        }).join("")
        this.moDal.classList.remove("change")
        this.liftBtn.addEventListener("click", this.lift)
        this.rightBtn.addEventListener("click", this.right)
        this.modalImages.addEventListener("click", this.choImg)
        this.timesBtn.addEventListener("click", this.times)
    }
    selectedImage(selectedImg) {
        this.chOOsen.src = selectedImg.src
        this.naMe.innerHTML = selectedImg.title
    }
    times() {
        this.moDal.classList.add("change")
        this.liftBtn.addEventListener("click", this.lift)
        this.rightBtn.addEventListener("click", this.right)
        this.modalImages.addEventListener("click", this.choImg)
        this.timesBtn.addEventListener("click", this.times)
    }
    lift() {
        let selected = this.modalImages.querySelector(".selected")
        let prev =
            selected.previousElementSibling || this.modalImages.lastElementChild
        selected.classList.remove("selected")
        prev.classList.add("selected")

        this.selectedImage(prev)
        
    }
    right() {
        let selected = this.modalImages.querySelector(".selected")
        let next =
            selected.nextElementSibling || this.modalImages.firstElementChild
        selected.classList.remove("selected")
        next.classList.add("selected")
        this.selectedImage(next)
    }
    choImg(e) {
        if (e.target.classList.contains("modal-img")) {
            let selected = this.modalImages.querySelector(".selected")
            selected.classList.remove("selected")
            this.selectedImage(e.target)
            e.target.classList.add("selected")
        }
    }

}


let nature = new Gallery(getItem(".nature"))
let cities = new Gallery(getItem(".cities"))



