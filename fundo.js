function Fundo(context, imagem) {
   this.context = context;
   this.imagem = imagem;
   this.velocidade = 0;
   this.posicaoEmenda = 0;
}
Fundo.prototype = {
   atualizar: function() {
      // Atualizar a posição de emenda
      this.posicaoEmenda += 
         this.velocidade * this.animacao.decorrido / 1000;
      
      // Emenda passou da posição
      if (this.posicaoEmenda > this.imagem.height)
         this.posicaoEmenda = 0;
   },
   desenhar: function() {
      var img = this.imagem;  // Para facilitar a escrita :D
      var ctx = this.context;
      var canvas = ctx.canvas;
      
      // A imagem é desenhada sempre em tamanho original (1:1),
      // repetida quantas vezes for preciso para cobrir o canvas.
      // Na horizontal, as cópias ímpares são espelhadas para que a
      // emenda entre uma cópia e a seguinte seja sempre contínua.
      var coluna = 0;
      for (var x = 0; x < canvas.width; x += img.width, coluna++) {
         var espelhar = (coluna % 2 == 1);
         
         ctx.save();
         if (espelhar) {
            ctx.translate(x + img.width, 0);
            ctx.scale(-1, 1);
         }
         else {
            ctx.translate(x, 0);
         }
         
         // Na vertical, começa uma cópia acima da emenda e segue
         // até passar o fim do canvas
         for (var y = this.posicaoEmenda - img.height; 
              y < canvas.height; y += img.height) {
            ctx.drawImage(img, 0, y, img.width, img.height);
         }
         
         ctx.restore();
      }
   }
}
