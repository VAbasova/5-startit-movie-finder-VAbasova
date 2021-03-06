import { browser, $, $$, element, by, ExpectedConditions as EC} from 'protractor';
import { expect } from 'chai';
import { HomePage } from '../pages/home';

describe('Navigation ',async function() {
    const homePage = new HomePage();

    beforeEach(async function () {
        await homePage.open();       
    })
    
    it('should open "Upcoming movies" section', async function() {
        const umPage = await homePage.openUpcomingMovies();
        
        //Verify that after click on upcomingMoviesSectionNavigatonButton url changes to '/upcoming'
        expect(await browser.getCurrentUrl()).to.equal(umPage.SECTION_LINK); 
        expect(await umPage.getSectionHeader()).to.equal(umPage.SECTION_HEDER);
        umPage.logger.info(await umPage.getSectionHeader() + ' opened!');
    })

    it('should open "Popular Series" section', async function(){
        const  psPage = await homePage.openPopularSeries();

        //Verify that after click on popularSeriesSectionNavigatonButton url changes to '/popular/series'
        expect(await browser.getCurrentUrl()).to.equal(psPage.SECTION_LINK); 
        expect(await psPage.getSectionHeader()).to.equal(psPage.SECTION_HEDER);
        psPage.logger.info(await psPage.getSectionHeader() + ' opened!');
    })
})

describe('Category navigation',async function() {
    const homePage = new HomePage();
    let categories = [ 'Action',  'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy',
    'History', 'Horror', 'Music', 'Mystery', 'Romance', 'Science Fiction', 'TV Movie', 'Thriller', 'War', 'Western' ]

    beforeEach(async function () {
        await homePage.open();       
    })
        
    categories.map(category => {
        it(`should open ${encodeURI(category)} category`, async function(){
            let moviesCategory = $(`a[href*="/${encodeURI(category)}"]`);
             
            await moviesCategory.click();
            await browser.wait(EC.visibilityOf(homePage.sectionHeader), 20000, 'sectioin header should appear in 20 seconds, but it doesnt')
    
            expect(await browser.getCurrentUrl()).to.contain(encodeURI(category));
            expect(await homePage.sectionHeader.getText()).to.equal(category);
            homePage.logger.info(await category + ' opened!');
        })
    })
})