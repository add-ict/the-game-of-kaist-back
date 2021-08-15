class Event:
	def __init__(self):
		self.idx=0
		self.name=''
		self.cause=''
		self.desc=['','']
		self.value=[[],[]]
	def __str__(self):
		return '\n'.join([str(self.idx),self.name,self.cause,str(self.desc)])
	def __call__(self,val,con):
		pass
	def getHTML(self):
		return f"<h1>{self.name}</h1><p>{self.cause}</p>"
