import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.util.Timer;

import javax.swing.JFrame;
import javax.swing.JPanel;

public class Main {
		
	static class MyFrame extends JFrame{
		
		//상수  상수는 대문자로 만들자.
		static int BALL_WIDTH = 20;
		static int BALL_HEIGHT = 20;
		static int BLOCK_ROWS =5 ;
		static int BLOCK_COLUMNS = 10;
		static int BLOCK_WIDTH = 40;
		static int BLOCK_HEIGHT = 20;
		static int BLOCK_GAP = 3;
		static int BAR_WIDTH = 80; 
		static int BAR_HEIGHT = 20;
		static int CANVAS_WIDTH = 400 + (BLOCK_GAP * BLOCK_COLUMNS)- BLOCK_GAP;
		static int CANVAS_HEIGHT = 600;
		
		
		
		//변수
		static MyPanel myPanel = null;
		static int score = 0;
		static Timer time = null;
		static Block[][] block = new Block[BLOCK_ROWS][BLOCK_COLUMNS];
		static Bar bar = new Bar();
		static Ball ball = new Ball();
		static int barXTarget = bar.x; //Target Value - interpolation
		static int dir=0; // 0: UP-RIGHT 1: DOWN-RIGHT 2: UP-LEFT 3:DOWN-LEFT 공이 네개의 방향으로 움직임.
		static int ballSpeed = 5; 
		
		
		static class Ball{
			int x = CANVAS_WIDTH / 2 - BALL_WIDTH / 2; //공 위치를 캔버스 센터에 위치
			int y = CANVAS_HEIGHT /2 - BALL_HEIGHT / 2; //
			int width = BALL_WIDTH;
			int height = BALL_HEIGHT;
			
		}
		
		static class Bar{
			int x = CANVAS_WIDTH / 2 - BAR_WIDTH / 2;
			int y = CANVAS_HEIGHT/2 - 100;
			int width = BAR_WIDTH;
			int height = BAR_HEIGHT;
		}
		static class Block{
			int x = 0;
			int y = 0;
			int width = BLOCK_WIDTH;
			int height =BLOCK_HEIGHT;
			int color = 0; //0:white 1:yellow 2:blue 3:magenta 4:red
			boolean isHidden = false; //충돌후에 블록이 사라질거임.
		}
		static class MyPanel extends JPanel{
			//CANVAS for Drawing
			public MyPanel() {
				this.setSize(CANVAS_WIDTH,CANVAS_HEIGHT);
				this.setBackground(Color.BLACK);
				
			}
			public void paint(Graphics g) {
				super.paint(g);
				Graphics2D g2d = (Graphics2D)g;
				
				drawUI(g2d);
			}
			private void drawUI(Graphics2D g2d) {
				//draw Block
				for(int i=0; i<BLOCK_ROWS; i++) {
					for( int j=0; j<BLOCK_COLUMNS; j++) {
						if(block[i][j].isHidden) {
							continue;
						}
						if(block[i][j].color==0) {
							g2d.setColor(Color.WHITE);
						}
						else if(block[i][j].color==1) {
							g2d.setColor(Color.YELLOW);
						}
						else if(block[i][j].color==2) {
							g2d.setColor(Color.BLUE);
						}
						else if(block[i][j].color==3) {
							g2d.setColor(Color.MAGENTA);
						}
						else if(block[i][j].color==4) {
							g2d.setColor(Color.RED);
						}
						g2d.fillRect(block[i][j].x,block[i][j].y,block[i][j].width,block[i][j].height);
				}
					//draw score 몇점인지를 그리자
					g2d.setColor(Color.WHITE);
					g2d.setFont(new Font("TimesRoman",Font.BOLD,20));
					g2d.drawString("score :"+score, CANVAS_WIDTH/2-30,20);
					
					//draw ball 공 그리기 
					g2d.setColor(Color.WHITE);
					g2d.fillOval(ball.x, ball.y, BALL_WIDTH,BALL_HEIGHT );
					
					
					//draw bar  바 그리기
					g2d.setColor(Color.GREEN);
					g2d.fillRect(bar.x, bar.y+280, bar.width, bar.height);
			}
		}
	}
		
		public MyFrame(String title) {
			super(title);
			this.setVisible(true);
			this.setSize(CANVAS_WIDTH,CANVAS_HEIGHT);
			this.setLocation(400,300);
			this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
			this.setLayout(new BorderLayout());
			
			initData();
			
			myPanel = new MyPanel();
			this.add("Center", myPanel);
			
			setKeyListener();
			startTimer();
			
		}
		public void initData() {
			for(int i=0; i<BLOCK_ROWS; i++) {
				for( int j=0; j<BLOCK_COLUMNS; j++) {
					block[i][j] = new Block();
					block[i][j].x = BLOCK_WIDTH * j + BLOCK_GAP*j;
					block[i][j].y = 100 + BLOCK_HEIGHT*i + BLOCK_GAP*i;
					block[i][j].width = BLOCK_WIDTH;
					block[i][j].height = BLOCK_HEIGHT;
					block[i][j].color = 4-i; //0:white 1:yellow 2:blue 3:magenta 4:red
					block[i][j].isHidden = false;
				}
			}
		}
		public void setKeyListener() {
			this.addKeyListener(new KeyApapter() {
				
				public void keyPressed(keyEvent e) {
					
				}
			});
			
			
		}
		public void startTimer() {
			
		}
	}
	
	
    public static void main(String[] args) {
    	new MyFrame("Block Game");	
     
    }
}
