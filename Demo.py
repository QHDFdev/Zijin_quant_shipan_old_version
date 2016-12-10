#coding: UTF-8

from ctaBase import *
from ctaTemplate import CtaTemplate

########################################################################
class Demo(CtaTemplate):
    className = 'Demo'
    author = u'heloworld'

    bar = None
    barMinute = EMPTY_STRING
    tradePrice = EMPTY_FLOAT
    bidPrice1 = EMPTY_FLOAT
    askPrice1 = EMPTY_FLOAT
    position = 0 

    paramList = ['name',
                 'className',
                 'author',
                 'vtSymbol']

    varList = ['inited',
               'trading',
               'pos']

    #----------------------------------------------------------------------
    def __init__(self, ctaEngine, setting, filepath=None):
        """Constructor"""
        super(Demo, self).__init__(ctaEngine, setting)


    #----------------------------------------------------------------------
    def onInit(self):
        self.writeCtaLog(u'demo')
        self.putEvent()

    #----------------------------------------------------------------------
    def onStart(self):
        self.writeCtaLog(u'')
        self.putEvent()

    #----------------------------------------------------------------------
    def onStop(self):
        self.writeCtaLog(u'')
        self.putEvent()

    #----------------------------------------------------------------------
    def onTick(self, tick):
        tickMinute = tick.datetime.minute

        if tickMinute != self.barMinute:
            if self.bar:
                self.onBar(self.bar)

            bar = CtaBarData()
            bar.vtSymbol = tick.vtSymbol
            bar.symbol = tick.symbol
            bar.exchange = tick.exchange

            bar.open = tick.lastPrice
            bar.high = tick.lastPrice
            bar.low = tick.lastPrice
            bar.close = tick.lastPrice

            bar.date = tick.date
            bar.time = tick.time
            bar.datetime = tick.datetime   

            self.bar = bar                 
            self.barMinute = tickMinute    

        else:
            bar = self.bar           
            bar.high = max(bar.high, tick.lastPrice)
            bar.low = min(bar.low, tick.lastPrice)
            bar.close = tick.lastPrice
        self.putEvent()
    #----------------------------------------------------------------------

    def onBar(self, bar): 
        if self.pos == 0 and bar.datetime.minute%2 == 0:
            self.buy(bar.close, 1)

        elif self.pos < 0 and bar.datetime.minute%2 == 0:
            self.cover(bar.close, 1)
            self.buy(bar.close, 1)
        
        if self.pos == 0 and bar.datetime.minute%2 != 0:
            self.short(bar.close, 1)
        elif self.pos > 0 and bar.datetime.minute%2 != 0:
            self.sell(bar.close, 1)
            self.short(bar.close, 1)

        self.putEvent()

    #----------------------------------------------------------------------
    def onOrder(self, order):
        pass

    #----------------------------------------------------------------------
    def onTrade(self, trade):
        pass

########################################################################################
