import pygame


class Ship:
    """管理飞船"""
    def __init__(self, ai_game):
        self.settings = ai_game.settings
        """初始化飞船和初始位置"""
        self.screen = ai_game.screen
        self.screen_rect = ai_game.screen.get_rect()
        """加载飞船图像并获取其外形矩阵"""
        self.image = pygame.image.load('image/ship.bmp')
        self.rect = self.image.get_rect()
        """对于每艘新飞船，都将其放在屏幕底部的中央"""
        self.rect.midbottom = self.screen_rect.midbottom
        """飞船中属性x中存储小数值"""
        self.x = float(self.rect.x)
        """移动标识"""
        self.moving_right = False
        self.moving_left = False

    def blitme(self):
        """在指定位置绘制飞船"""
        self.screen.blit(self.image, self.rect)

    def update(self):
        if self.moving_right and self.rect.right < self.screen_rect.right:
            self.x += self.settings.ship_speed
        if self.moving_left and self.rect.left > 0:
            self.x -= self.settings.ship_speed
        # 根据 self.x 更新 rect 对象
        self.rect.x = self.x

