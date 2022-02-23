let infoperso = {
    template: `
    <section v-if="info" id="infoPerso" class="conteneur flex">
    <div>
    <h2>{{info.lastName}} {{info.firstName}}</h2>
    <p>{{info.adress}} </p>
    <p>{{info.email}}</p>
    <p>{{info.phone}}</p>
    <p>{{age}} ans</p>
    <p v-if="info.car" style="color:green">Voiture : {{this.vehicle}} </p>
     <p v-else="info.car" style="color:red">Voiture : {{this.vehicle}} </p>
    </div>
    <div>
    <img v-if="trombi" :src="trombi" alt="photo de profil"/>
    </div>
</section>
    `,
    props: ['info', 'trombi'],
    computed: {
        vehicle: function () {
            if (this.info)
                return (this.info.car) ? 'oui' : 'non';
        },
        age: function () {
            if (this.info) {
                return Math.floor((new Date().getTime() - Date.parse(this.info.birthDate)) / (1000 * 60 * 60 * 24 * 365.25));
            }
        }
    },
};

let formation = {
    template: `
    <section v-if="schools" id="formation" class="conteneur">
    <h2>Formations</h2>
        <div class="formDetail" v-for="school of schools">
            <h3>{{school.nom}}</h3>
            <span>Du {{school.start}} au {{school.end}}</span>
            <p v-html="school.detail"></p>
        </div>
    </section>
    `,
    props: ['schools'],
};

let experiencepro = {
    template: `
    <section v-if="experiences" id="experience" class="conteneur">
    <h2>Expériences professionnelles</h2>
        <div class="exp" v-for="experience of experiences">
            <h3>{{experience.fonction}}</h3>
            <span>Du {{experience.start}} au {{experience.end}}</span>
            <p v-html="experience.detail"></p>
        </div>
    </section>
    `,
    props: ['experiences'],
};

let competences = {
    template: `
        <section v-if="competences" id="competences" class="conteneur">
        <h2>Compétences</h2>
            <ul>
                <li v-for="competence of competences">{{competence}}</li>
            </ul>
        </section>
    `,
    props: ['competences'],
};

let vm = new Vue({
    el: '#app',
    data: {
        lastName: null,
        firstName: null,
        birthDate: null,
        adress: null,
        phone: null,
        mail: null,
        url: null,
        car: null,
        intitule: null,
        formDateStart: null,
        formDateEnd: null,
        formDetail: null,
        schools: [],
        fonction: null,
        expDateStart: null,
        expDateEnd: null,
        expDetail: null,
        history: [],
        skill: null,
        skills: [],
        infoPerso: null,
        trombi: null,
    },
    created: function () {
        let data = JSON.parse(localStorage.getItem('cv'));
        for (key in data) {
            this[key] = data[key];
        }
    },
    computed: {
        age: function () {
            if (this.birthDate) {
                return Math.floor((new Date().getTime() - Date.parse(this.birthDate)) / (1000 * 60 * 60 * 24 * 365.25));
            }
        }
    },
    methods: {
        infoAdd: function () {
            if (this.lastName != null && this.firstName != null && this.birthDate != null && this.adress != null && this.phone != null && this.mail != null && this.car != null) {
                let date = this.birthDate.toString();
                this.infoPerso = { birthDate: date, lastName: this.lastName, firstName: this.firstName, adress: this.adress, car: this.car, email: this.mail, phone: this.phone };
            } else alert('Veuillez completer le formulaire !');
        },
        formAdd: function () {
            let start = Intl.DateTimeFormat("fr-FR").format(Date.parse(this.formDateStart)).toString();
            let end = Intl.DateTimeFormat("fr-FR").format(Date.parse(this.formDateEnd)).toString();
            let detail = this.formDetail.replaceAll("\n", "<br/>");
            this.schools.push({ nom: this.intitule, start: start, end: end, detail: detail });
            this.intitule = null;
            this.formDateStart = null;
            this.formDateEnd = null;
            this.formDetail = null;
        },
        expAdd: function () {
            let start = Intl.DateTimeFormat("fr-FR").format(Date.parse(this.expDateStart)).toString();
            let end = Intl.DateTimeFormat("fr-FR").format(Date.parse(this.expDateEnd)).toString();
            let detail = this.expDetail.replaceAll("\n", "<br/>");
            this.history.push({ fonction: this.fonction, start: start, end: end, detail: detail });
            this.expDateStart = null;
            this.expDateEnd = null;
            this.fonction = null;
            this.expDetail = null;
        },
        clear: function () {
            this.lastName = null;
            this.firstName = null;
            this.birthDate = null;
            this.adress = null;
            this.phone = null;
            this.mail = null;
            this.car = null;
        },
        compAdd: function () {
            this.skills.push(this.skill);
        },
        addPicture: function () {
            this.trombi = this.url
        },
        toLocalStorage: function () {
            localStorage.setItem('cv', JSON.stringify(this.$data))
        },
        clearLocalStorage: function () {
            if (confirm("Confirmez vous la suppression ?"))
                localStorage.removeItem('cv');
        },
        testfct: function () {
            for (comp of this.skills) console.log(comp)
            console.log(this.skills[0])
        }
    },
    components: {
        infoperso,
        formation,
        experiencepro,
        competences,
    }
});