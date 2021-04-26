import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
    selector: '[appHintBehaviour]'
})
export class hindDirective implements OnInit{
    constructor(private evelment: ElementRef){

    }

    ngOnInit(): void{
        this.evelment.nativeElement.style.color = '#2f2e2e';
        this.evelment.nativeElement.style.fontWeight = '500';
    }
}