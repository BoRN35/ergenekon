/* Ergenekon ek araştırma: tüm haritada toplama hızına +%50 (5 seviye x %10). */
(function(root){
 var D=root.WHITEOUT_RESEARCH_DATA;if(!D||D.some(function(z){return z.key==='wos_bozkir-toplayicilari'}))return;
 var base={et:4000,odun:4000,komur:810,demir:200,celik:240},bil=[4,6,8,10,12],sec=[300,900,2700,7200,18000];
 D.push({key:'wos_bozkir-toplayicilari',name:'Bozkır Toplayıcıları',source:'https://www.whiteoutsurvival.wiki/research/',branch:'e',unit:null,effectMode:'incremental',
  levels:bil.map(function(b,i){var m=Math.pow(2.2,i),c={};for(var k in base)c[k]=Math.round(base[k]*m/10)*10;
   return {level:i+1,requirements:[{key:'bilgelik',level:b,building:true}],cost:c,seconds:sec[i],effects:{'Gathering Speed':10},bonusText:'Gathering Speed: 10%',unlock:null,sourceIssues:[],power:2000*(i+1)}})});
})(window);
