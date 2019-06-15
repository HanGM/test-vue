$(function(){
	//头部效果
	(function(){
		$('.header .nav li').hover(function(){
			$(this).find('.select').stop().slideDown(100)
		},function(){
			$(this).find('.select').slideUp(100)
		})
	})();
	//banner轮播效果
	(function(){
		var num = 0;
		var timer = setInterval(nextPic,4000);
		$('.banner .list').hover(function(){
			clearInterval(timer)
		},function(){
			timer = setInterval(nextPic,4000);
		});
		function nextPic(){
			num = num >= $('.banner .pic').length-1 ? 0 : ++ num;
			move();
		}
		$('.banner .next').click(nextPic);
		$('.banner .prev').click(function(){
			num = num <= 0 ? $('.banner .pic').length-1 : -- num;
			move();
		});
		$('.banner .list .item').click(function(){
			num = $(this).index();
			move();
		});
		function move(){
			$('.banner .list .item').eq(num).addClass('cur').siblings().removeClass('cur')
			$('.banner .pic').eq(num).fadeIn().addClass('cur').siblings('.pic').hide().removeClass('cur')
		}
	})();
	//our-works 主要产品
	(function(){
		var num = 0;
		var i = 1;
		$('.our-works .prev').click(function(){
			num = num <= 0 ? $('.our-works .item').length-1 : -- num;
			i = -1;
			move();
		});
		$('.our-works .next').click(function(){
			num = num >= $('.our-works .item').length-1 ? 0 : ++ num;
			i = 1;
			move();
		});
		$('.our-works .list-btn .list-dashed').click(function(){
			if($(this).index() > num){
				i = 1;
			}else{
				i = -1;
			}
			num = $(this).index();
			move();
		})
		function move(){
			$('.our-works .pic').css('left',150*i);
			$('.our-works .context').css('left',450*i);
			$('.our-works .pic').animate({
				left : 0
			});
			$('.our-works .context').animate({
				left : 0
			});
			$('.our-works .item').eq(num).fadeIn().addClass('cur').siblings('.item').hide().removeClass('cur');
			$('.our-works .list-btn .list-dashed').eq(num).addClass('cur').siblings().removeClass('cur')	
		}
	})();
	//business-scope 业务范围
	(function(){
		$('.business-scope .close').click(function(){
			$(this).animate({
				backgroundPositionY : -67
			},200).parent().siblings('.scope').find('.close').animate({
				backgroundPositionY : 0
			})
			if($(this).css('backgroundPositionY') == '-67px'){
				$(this).animate({
					backgroundPositionY : 0
				},200).parent().siblings('.scope').find('.close').animate({
					backgroundPositionY : 0
				},200)
			}
		})
		$('.business-scope .close,.business-scope .center').click(function(){
			$(this).parents('.scope').find('.select').slideToggle().end().siblings('.scope').find('.select').slideUp();
		});
	})();
	//our-team 团队介绍
	(function(){
		var num = 0;
		var i = 1;
		var timer = setInterval(nextPic,4000);
		$('.our-team .list').hover(function(){
			clearInterval(timer)
		},function(){
			timer = setInterval(nextPic,4000);
		});
		function nextPic(){
			num = num >= $('.our-team .two-team').length-1 ? 0 : ++ num;
			i = 1;
			move();
		}
		$('.our-team .next').click(nextPic);
		$('.our-team .prev').click(function(){
			num = num <= 0 ? $('.our-team .two-team').length-1 : -- num;
			i = -1;
			move();
		});
		$('.our-team .list .item').click(function(){
			if($(this).index() > num){
				i = 1;
			}else{
				i = -1;
			}
			num = $(this).index();
			move();
		});
		function move(){
			$('.our-team .two-team').css('left',200*i);
			$('.our-team .two-team').animate({
				left : 0
			});
			$('.our-team .list .item').eq(num).addClass('cur').siblings().removeClass('cur')
			$('.our-team .two-team').eq(num).show().addClass('cur').siblings('.two-team').hide().removeClass('cur')
		}
	})();
	//地图
	(function(){
		var map = new BMap.Map("myMap");    // 创建Map实例
		var point = new BMap.Point(116.350838, 40.088211);//设置中心点坐标
		map.centerAndZoom(point, 15);  // 初始化地图,设置中心点坐标和地图级别
		var marker = new BMap.Marker(point);  // 创建标注
		map.addOverlay(marker);               // 将标注添加到地图中
		marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
		var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});// 左上角，添加比例尺
		var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
		var top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}); //右上角，仅包含平移和缩放按钮
		map.addControl(top_left_control);        
		map.addControl(top_left_navigation);     
		map.addControl(top_right_navigation);    
	})();
})