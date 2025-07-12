import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [coins, setCoins] = useState(0);
  const [clickPower, setClickPower] = useState(1);
  const [clickLimit, setClickLimit] = useState(250);
  const [clicksLeft, setClicksLeft] = useState(250);
  const [upgradePrice, setUpgradePrice] = useState(100);
  const [limitPrice, setLimitPrice] = useState(500);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  const handleCoinClick = () => {
    if (clicksLeft > 0) {
      setCoins((prev) => prev + clickPower);
      setClicksLeft((prev) => prev - 1);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const handleLogin = () => {
    if (username && password) {
      setIsLoggedIn(true);
    }
  };

  const handleUpgrade = () => {
    if (coins >= upgradePrice) {
      setCoins((prev) => prev - upgradePrice);
      setClickPower((prev) => prev * 2);
      setUpgradePrice((prev) => prev * 2);
    }
  };

  const handleLimitUpgrade = () => {
    if (coins >= limitPrice) {
      setCoins((prev) => prev - limitPrice);
      setClickLimit((prev) => prev * 2);
      setClicksLeft((prev) => prev * 2);
      setLimitPrice((prev) => prev * 2);
    }
  };

  const handlePromoCode = () => {
    if (promoCode === "стадо") {
      setIsAdmin(true);
      setPromoCode("");
    }
  };

  useEffect(() => {
    const timer = setInterval(
      () => {
        setClicksLeft(clickLimit);
      },
      30 * 60 * 1000,
    );
    return () => clearInterval(timer);
  }, [clickLimit]);

  const leaderboard = [
    { rank: 1, name: "Player1", coins: 50000 },
    { rank: 2, name: "Player2", coins: 35000 },
    { rank: 3, name: "Player3", coins: 28000 },
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-game-blue via-game-orange to-game-gold flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-game-dark">
              Косяк Койн 🪙
            </CardTitle>
            <p className="text-game-dark/70">Войдите в игру</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="username">Ник</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Введите ник"
              />
            </div>
            <div>
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
              />
            </div>
            <Button
              onClick={handleLogin}
              className="w-full bg-game-orange hover:bg-game-orange/90"
              disabled={!username || !password}
            >
              Войти
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-game-blue via-game-orange to-game-gold p-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Косяк Койн 🪙</h1>
          <p className="text-white/80">Добро пожаловать, {username}!</p>
        </header>

        <Tabs defaultValue="game" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="game">Игра</TabsTrigger>
            <TabsTrigger value="profile">Профиль</TabsTrigger>
            <TabsTrigger value="leaderboard">Рейтинг</TabsTrigger>
            <TabsTrigger value="shop">Магазин</TabsTrigger>
            <TabsTrigger value="inventory">Инвентарь</TabsTrigger>
            {isAdmin && <TabsTrigger value="admin">Админка</TabsTrigger>}
          </TabsList>

          <TabsContent value="game" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Кликер</span>
                    <Badge variant="secondary">{coins} койнов</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                  <div
                    onClick={handleCoinClick}
                    className={`mx-auto w-48 h-48 bg-gradient-to-br from-game-gold to-game-orange rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 ${
                      isAnimating
                        ? "animate-bounce-coin animate-pulse-glow"
                        : ""
                    } ${clicksLeft === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <span className="text-6xl">🪙</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-semibold">
                      За клик: +{clickPower} койнов
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Кликов осталось: {clicksLeft}/{clickLimit}
                    </p>
                    <Progress
                      value={(clicksLeft / clickLimit) * 100}
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Статистика</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Всего койнов:</span>
                    <Badge>{coins}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Сила клика:</span>
                    <Badge>{clickPower}x</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Лимит кликов:</span>
                    <Badge>{clickLimit}</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Профиль игрока</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-game-orange rounded-full flex items-center justify-center">
                    <Icon name="User" size={32} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{username}</h3>
                    <p className="text-muted-foreground">Активный игрок</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold text-game-orange">
                        {coins}
                      </p>
                      <p className="text-sm text-muted-foreground">Койнов</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold text-game-blue">
                        {clickPower}x
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Сила клика
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="promo">Промокод</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="promo"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Введите промокод"
                    />
                    <Button onClick={handlePromoCode}>Применить</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leaderboard">
            <Card>
              <CardHeader>
                <CardTitle>Рейтинг игроков</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((player) => (
                    <div
                      key={player.rank}
                      className="flex items-center justify-between p-3 bg-muted rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <Badge
                          variant={player.rank === 1 ? "default" : "secondary"}
                        >
                          #{player.rank}
                        </Badge>
                        <span className="font-medium">{player.name}</span>
                      </div>
                      <Badge className="bg-game-gold text-game-dark">
                        {player.coins.toLocaleString()} койнов
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shop">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Улучшение клика</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Удваивает силу клика: {clickPower}x → {clickPower * 2}x
                  </p>
                  <Button
                    onClick={handleUpgrade}
                    disabled={coins < upgradePrice}
                    className="w-full bg-game-orange hover:bg-game-orange/90"
                  >
                    Купить за {upgradePrice} койнов
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Увеличение лимита</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Удваивает лимит кликов: {clickLimit} → {clickLimit * 2}
                  </p>
                  <Button
                    onClick={handleLimitUpgrade}
                    disabled={coins < limitPrice}
                    className="w-full bg-game-blue hover:bg-game-blue/90"
                  >
                    Купить за {limitPrice} койнов
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="inventory">
            <Card>
              <CardHeader>
                <CardTitle>Инвентарь</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                  <div className="aspect-square bg-game-gold/20 rounded-lg flex items-center justify-center border-2 border-game-gold">
                    <span className="text-2xl">🪙</span>
                  </div>
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/30">
                    <Icon
                      name="Plus"
                      size={24}
                      className="text-muted-foreground"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {isAdmin && (
            <TabsContent value="admin">
              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600">
                    Панель администратора
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h3 className="font-bold text-red-800 mb-2">
                      Модерация игроков
                    </h3>
                    <div className="space-y-2">
                      <Button variant="destructive" size="sm">
                        <Icon name="Ban" size={16} className="mr-2" />
                        Заблокировать игрока
                      </Button>
                      <Button variant="outline" size="sm">
                        <Icon name="UserCheck" size={16} className="mr-2" />
                        Просмотр статистики
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
