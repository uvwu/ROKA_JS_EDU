const axios=require('axios');
const cheerio=require('cheerio');
function crawler(){
	// 크롤링
	const url=`https://entertain.daum.net/ranking/popular`;
	
	axios.get(url)
	  .then(res => {
		
		if(res.status==200){
			//console.log(res.data);
			let crawled=[];
			
			
			const $=cheerio.load(res.data);
			
			//랭킹 칸하나
			const $List=$('#mArticle > div.ranking_list > ol > li'); 
			
			
			$List.each(function(i){
				crawled[i]={
					
					title: $(this).find('li > div > div > div > strong > a').text(), 
					
					logo:$(this).find('li  > a > img').attr('src'),
				};
			});
			console.log(crawled);
		}
		
		
	});
	
}
crawler();

//#mArticle > div.ranking_list > ol > li:nth-child(1)
//#mainContainer > div.section_ranking.section_content_view.content > div.ranking_frame > ol > li:nth-child(1) > a

//#mArticle > div.ranking_list > ol > li:nth-child(1) > div > div > div > strong > a
//#mainContainer > div.section_ranking.section_content_view.content > div.ranking_frame > ol > li:nth-child(1) > a > div.cell_cafe > div > div.cafe_info > div.txt_area > p

//#mArticle > div.ranking_list > ol > li:nth-child(1) > a > img
//#mainContainer > div.section_ranking.section_content_view.content > div.ranking_frame > ol > li:nth-child(1) > a > div.cell_cafe > div > div.cafe_thumb > div > img
//#mainContainer > div.section_ranking.section_content_view.content > div.ranking_frame > ol > li:nth-child(1) > a > div.cell_cafe > div > div.cafe_thumb > div > img