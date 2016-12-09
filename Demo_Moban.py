# encoding: UTF-8
"""
�����Demo��һ����򵥵Ĳ���ʵ�֣���δ����̫��ʵ���еĽ���ϸ�ڣ��磺
1. ί�м۸񳬳��ǵ�ͣ�۵��µ�ί��ʧ��
2. ί��δ�ɽ�����Ҫ����������ί��
3. ������ָ�����״̬
"""
from ctaBase import *
from ctaTemplate import CtaTemplate

########################################################################
class Demo(CtaTemplate):
    """˫ָ�����߲���Demo"""
    className = 'Demo'
    author = u'coder name'

    # ���Բ���
    fastK = 0.9     # ����EMA����
    slowK = 0.1     # ����EMA����
    initDays = 10   # ��ʼ���������õ�����

    # ���Ա���
    bar = None
    barMinute = EMPTY_STRING

    fastMa = []             # ����EMA��������
    fastMa0 = EMPTY_FLOAT   # ��ǰ���µĿ���EMA
    fastMa1 = EMPTY_FLOAT   # ��һ���Ŀ���EMA

    slowMa = []             # ��������ͬ
    slowMa0 = EMPTY_FLOAT
    slowMa1 = EMPTY_FLOAT

    # �����б������˲���������
    paramList = ['name',
                 'className',
                 'author',
                 'vtSymbol',
                 'fastK',
                 'slowK']

    # �����б������˱���������
    varList = ['inited',
               'trading',
               'pos',
               'fastMa0',
               'fastMa1',
               'slowMa0',
               'slowMa1']

    #----------------------------------------------------------------------
    def __init__(self, ctaEngine, setting):
        """Constructor"""
        super(Demo, self).__init__(ctaEngine, setting)

       # ע��������еĿɱ�������ԣ�ͨ����list��dict�ȣ����ڲ��Գ�ʼ��ʱ��Ҫ���´�����
        # �������ֶ������ʵ��֮�����ݹ����������п��ܵ���Ǳ�ڵĲ����߼�������գ�
        # �������е���Щ�ɱ�������Կ���ѡ��д��ȫ������__init__���棬д��Ҫ��Ϊ���Ķ�
        # ����ʱ���㣨�����Ǹ����ϰ�ߵ�ѡ��
        self.fastMa = []
        self.slowMa = []

    #----------------------------------------------------------------------
    def onInit(self):
        """��ʼ�����ԣ��������û��̳�ʵ�֣�"""
        self.writeCtaLog(u'demo���Գ�ʼ��')

        initData = self.loadBar(self.initDays)
        for bar in initData:
            self.onBar(bar)

        self.putEvent()

    #----------------------------------------------------------------------
    def onStart(self):
        """�������ԣ��������û��̳�ʵ�֣�"""
        self.writeCtaLog(u'demo��������')
        self.putEvent()

    #----------------------------------------------------------------------
    def onStop(self):
        """ֹͣ���ԣ��������û��̳�ʵ�֣�"""
        self.writeCtaLog(u'demo����ֹͣ')
        self.putEvent()

    #----------------------------------------------------------------------
    def onTick(self, tick):
        """�յ�����TICK���ͣ��������û��̳�ʵ�֣�"""
        # ����K��
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
            bar.datetime = tick.datetime    # K�ߵ�ʱ����Ϊ��һ��Tick��ʱ��

            # ʵ�����ò��������ݿ���ѡ���㣬�Ӷ��ӿ��ٶ�

            #bar.volume = tick.volume
            #bar.openInterest = tick.openInterest

            self.bar = bar                  # ����д��Ϊ�˼���һ����ʣ��ӿ��ٶ�
            self.barMinute = tickMinute     # ���µ�ǰ�ķ���

        else:                               # ��������ۼ��µ�K��

            bar = self.bar                  # д��ͬ��Ϊ�˼ӿ��ٶ�

            bar.high = max(bar.high, tick.lastPrice)
            bar.low = min(bar.low, tick.lastPrice)
            bar.close = tick.lastPrice

    #----------------------------------------------------------------------

    def onBar(self, bar):
        """�յ�Bar���ͣ��������û��̳�ʵ�֣�"""
		"""�㷨���ģ����ܵ�Bar���ݺ��㷨�߼��ж�"""
		#�����������
        if not self.fastMa0:
            self.fastMa0 = bar.close
            self.fastMa.append(self.fastMa0)
        else:
            self.fastMa1 = self.fastMa0
            self.fastMa0 = bar.close * self.fastK + self.fastMa0 * (1 - self.fastK)
            self.fastMa.append(self.fastMa0)

        if not self.slowMa0:
            self.slowMa0 = bar.close
            self.slowMa.append(self.slowMa0)
        else:
            self.slowMa1 = self.slowMa0
            self.slowMa0 = bar.close * self.slowK + self.slowMa0 * (1 - self.slowK)
            self.slowMa.append(self.slowMa0)

        # �ж�����
        crossOver = self.fastMa0>self.slowMa0 and self.fastMa1<self.slowMa1     # ����ϴ�
        crossBelow = self.fastMa0<self.slowMa0 and self.fastMa1>self.slowMa1    # �����´�

        # ��������������ǻ���
        # ���е�ί�о���K�����̼�ί�У�������һ��ʵ�����޷��ɽ��ķ��գ�������Ӷ�ģ���м۵����͵�֧�֣�
        if crossOver:
            # ������ʱ��ͷû�гֲ֣���ֱ������
            if self.pos == 0:
                self.buy(bar.close, 1)
            # ����п�ͷ�ֲ֣�����ƽ�գ�������
            elif self.pos < 0:
                self.cover(bar.close, 1)
                self.buy(bar.close, 1)
        # ����ͽ���෴
        elif crossBelow:
            if self.pos == 0:
                self.short(bar.close, 1)
            elif self.pos > 0:
                self.sell(bar.close, 1)
                self.short(bar.close, 1)

        # ����״̬�����¼�
        self.putEvent()

    #----------------------------------------------------------------------
    def onOrder(self, order):
        """�յ�ί�б仯���ͣ��������û��̳�ʵ�֣�"""
        # ����������ϸ����ί�п��ƵĲ��ԣ����Ժ���onOrder
        pass

    #----------------------------------------------------------------------
    def onTrade(self, trade):
        """�յ��ɽ����ͣ��������û��̳�ʵ�֣�"""
        # ����������ϸ����ί�п��ƵĲ��ԣ����Ժ���onOrder
        pass


########################################################################################
class OrderManagementDemo(CtaTemplate):
    """����tick����ϸ���ȳ���׷������demo"""

    className = 'OrderManagementDemo'
    author = u'��Python�Ľ���Ա'

    # ���Բ���
    initDays = 10   # ��ʼ���������õ�����

    # ���Ա���
    bar = None
    barMinute = EMPTY_STRING


    # �����б������˲���������
    paramList = ['name',
                 'className',
                 'author',
                 'vtSymbol']

    # �����б������˱���������
    varList = ['inited',
               'trading',
               'pos']

    #----------------------------------------------------------------------
    def __init__(self, ctaEngine, setting):
        """Constructor"""
        super(OrderManagementDemo, self).__init__(ctaEngine, setting)

        self.lastOrder = None
        self.orderType = ''

    #----------------------------------------------------------------------
    def onInit(self):
       """��ʼ�����ԣ��������û��̳�ʵ�֣�"""
        self.writeCtaLog(u'demo���Գ�ʼ��')

        initData = self.loadBar(self.initDays)
        for bar in initData:
            self.onBar(bar)

        self.putEvent()

    #----------------------------------------------------------------------
    def onStart(self):
        """�������ԣ��������û��̳�ʵ�֣�"""
        self.writeCtaLog(u'demo��������')
        self.putEvent()

    #----------------------------------------------------------------------
    def onStop(self):
        """ֹͣ���ԣ��������û��̳�ʵ�֣�"""
        self.writeCtaLog(u'demo����ֹͣ')
        self.putEvent()

    #----------------------------------------------------------------------
    def onTick(self, tick):
        """�յ�����TICK���ͣ��������û��̳�ʵ�֣�"""

        # �������ɽ��򵥲��Ե�
        if self.lastOrder == None:
            self.buy(tick.lastprice - 10.0, 1)

        # CTAί������ӳ��
        if self.lastOrder != None and self.lastOrder.direction == u'��' and self.lastOrder.offset == u'����':
            self.orderType = u'��'

        elif self.lastOrder != None and self.lastOrder.direction == u'��' and self.lastOrder.offset == u'ƽ��':
            self.orderType = u'��ƽ'

        elif self.lastOrder != None and self.lastOrder.direction == u'��' and self.lastOrder.offset == u'����':
            self.orderType = u'����'

        elif self.lastOrder != None and self.lastOrder.direction == u'��' and self.lastOrder.offset == u'ƽ��':
            self.orderType = u'��ƽ'

        # ���ɽ�������������׷��
        if self.lastOrder != None and self.lastOrder.status == u'δ�ɽ�':

            self.cancelOrder(self.lastOrder.vtOrderID)
            self.lastOrder = None
        elif self.lastOrder != None and self.lastOrder.status == u'�ѳ���':
        # ׷��������Ϊ���ܳɽ�

            self.sendOrder(self.orderType, self.tick.lastprice - 10, 1)
            self.lastOrder = None

    #----------------------------------------------------------------------
    def onBar(self, bar):
        """�յ�Bar���ͣ��������û��̳�ʵ�֣�"""
        pass

    #----------------------------------------------------------------------
    def onOrder(self, order):
        """�յ�ί�б仯���ͣ��������û��̳�ʵ�֣�"""
        # ����������ϸ����ί�п��ƵĲ��ԣ����Ժ���onOrder
        self.lastOrder = order

    #----------------------------------------------------------------------

    def onTrade(self, trade):
        """�յ��ɽ����ͣ��������û��̳�ʵ�֣�"""
        # ����������ϸ����ί�п��ƵĲ��ԣ����Ժ���onOrder
        pass