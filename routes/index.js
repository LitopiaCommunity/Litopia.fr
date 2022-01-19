var MainController = require('../app/controller/MainController');
var CandidatureController = require('../app/controller/CandidatureController');
var MembersController = require('../app/controller/MembersController')

var express = require('express');
var router = express.Router();

const expressSitemapXml = require('express-sitemap-xml')
const db = require('../database/databaseController');
const url = require("url");

router.use(expressSitemapXml(getUrls, 'https://litopia.fr'))

async function getMembers() {
    let data = await db.query("SELECT * FROM MEMBERS WHERE rolename is not null;");
    return data.rows;
}

async function getUrls() {
    let route = [
        {
            'url': '/',
            'lastmod': '23-06-2020',
            'changefreq': 'yearly',
            'priority': 1.0
        },
        {
            'url': '/nous-rejoindre',
            'lastmod': '23-06-2020',
            'changefreq': 'yearly',
            'priority': 0.9
        },
        {
            'url': '/nous-rejoindre/reglement',
            'lastmod': '23-06-2020',
            'changefreq': 'yearly',
            'priority': 0.8
        },
        {
            'url': '/nous-rejoindre/1',
            'lastmod': '23-06-2020',
            'changefreq': 'yearly',
            'priority': 0.2
        },
        {
            'url': '/nous-rejoindre/2',
            'lastmod': '23-06-2020',
            'changefreq': 'yearly',
            'priority': 0.2
        },
        {
            'url': '/nous-rejoindre/3',
            'lastmod': '23-06-2020',
            'changefreq': 'yearly',
            'priority': 0
        },
        {
            'url': '/membres',
            'lastmod': '23-06-2020',
            'changefreq': 'monthly',
            'priority': 0.5
        },
        {
            'url': '/serveur',
            'lastmod': '23-06-2020',
            'changefreq': 'yearly',
            'priority': 1.0
        }
    ]
    members = await getMembers();
    for (let i = 0; i < members.length; i++) {
        route.push({
            'url': '/membres/' + members[i].minecraftnickname,
            'lastmod': (members[i].lastupdate ? members[i].lastupdate : members[i].acceptedate),
            'changefreq': 'weekly',
            'priority': 0
        })
    }
    return route
}

const age = new Date().getFullYear() - 2017;
const version = '1.18.1';
const defaultTitle = `Litopia Serveur Minecraft UHC ${version}`
const rootUrl = 'https://litopia.fr'
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('accueil', {
        title: 'Accueil', seo: {
            title: 'Accueil - ' + defaultTitle,
            description: `Litopia est un Serveur Minecraft UHC Vanilla type HolyCube en ${version} sous candidature. Notre communauté est soudée et active depuis déjà ${age} ans.`,
        },
        openGraph: {
            title: defaultTitle,
            description: `Litopia est un Serveur Minecraft UHC Vanilla type HolyCube en ${version} sous candidature. Notre communauté est soudée et active depuis déjà ${age} ans.`,
            url: rootUrl,
            type: 'website',
            image: rootUrl + '/images/header1.webp',
            siteName: 'Litopia',
            locale: 'fr_FR'
        }
    })
});

router.get('/nous-rejoindre', function (req, res, next) {
    res.render('./nous-rejoindre/index', {
        title: `Nous Rejoindre`, seo: {
            title: 'Nous Rejoindre - ' + defaultTitle,
            description: `Candidatez pour Litopia afin de rejoindre l'aventure ! Notre communauté est soudée et vous accueillera les bras ouverts.`,
        },
        openGraph: {
            title: defaultTitle,
            description: `Vous voulez rejoindre Litopia ? Nous sommes là pour vous aider ! Alors n'hésitez pas à nous rejoindre !`,
            url: rootUrl+'/nous-rejoindre',
            type: 'website',
            image: rootUrl + '/images/candidature.webp',
            siteName: 'Litopia',
            locale: 'fr_FR'
        }
    })
});

router.get('/nous-rejoindre/reglement', function (req, res, next) {
    res.render('./nous-rejoindre/reglement', {
        title: `Règlement`,
        seo: {
            title: 'Règlement - ' + defaultTitle,
            description: `Litopia est un serveur de qualité supérieur, nous avons donc un règlement auquel nos membres sont soumis et que vous devrez aussi respecter.`,
        },
        openGraph: {
            title: defaultTitle,
            description: `Litopia est un serveur de qualité supérieur, nous avons donc un règlement auquel nos membres sont soumis et que vous devrez aussi respecter.`,
            url: rootUrl+'/nous-rejoindre/reglement',
            type: 'website',
            image: rootUrl + '/images/reglement.webp',
            siteName: 'Litopia',
            locale: 'fr_FR'
        }
    });
});

router.get('/serveur', function (req, res, next) {
    res.render('./serveur', {
        title: 'Serveur',
        seo: {
            title: 'Serveur - ' + defaultTitle,
            description: `Litopia dispose d'un serveur dédier très puissant avec lequel votre Minecraft sera toujours à 20 TPS.`,
        },
        openGraph: {
            title: defaultTitle,
            description: `Litopia dispose d'un serveur dédier très puissant avec lequel votre Minecraft sera toujours à 20 TPS.`,
            url: rootUrl+'/serveur',
            type: 'website',
            image: rootUrl + '/images/serveur.webp',
            siteName: 'Litopia',
            locale: 'fr_FR'
        }
    });
});

router.get('/nous-rejoindre/:step', function (req, res, next) {
    let mainController = new MainController(req, res, next);
    mainController.steper();
});

router.get('/membres', function (req, res, next) {
    let membersController = new MembersController(req, res, next);
    membersController.displayMembers();
});

router.get('/membres/:nickname', function (req, res, next) {
    let membersController = new MembersController(req, res, next);
    membersController.displayMember();
});

router.post('/api/check/candidature', function (req, res, next) {
    let candidControl = new CandidatureController(req, res);
    candidControl.checker();
});

router.post('/api/send/candidature', function (req, res, next) {
    let candidControl = new CandidatureController(req, res);
    candidControl.send();
});


module.exports = router;
